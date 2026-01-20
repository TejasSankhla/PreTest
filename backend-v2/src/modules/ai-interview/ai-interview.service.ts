import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import axios from 'axios';
import { Interview, InterviewDocument } from '../../schemas/interview.schema';
import { Agent, AgentDocument } from '../../schemas/agent.schema';
import { ListInterviewsDto } from './dto';

export interface PaginatedResult<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface SignedUrlResponse {
  signedUrl: string;
  agentId: string;
  interviewId: string;

  // Agent info
  agentName: string;
  agentCompany: string;
  agentRole: string;
  agentPhoto?: string;

  // For ElevenLabs Overrides (frontend can customize conversation)
  systemPrompt?: string;
  firstMessage?: string;

  // Interview context
  interviewName: string;
  durationMins: number;
}

// ElevenLabs Conversation API response types
export interface ElevenLabsTranscriptItem {
  role: 'agent' | 'user';
  message: string;
  time_in_call_secs: number;
  tool_calls?: unknown[];
  tool_results?: unknown[];
}

export interface ElevenLabsConversation {
  conversation_id: string;
  agent_id: string;
  status: string;
  transcript: ElevenLabsTranscriptItem[];
  metadata?: {
    start_time_unix_secs?: number;
    end_time_unix_secs?: number;
    call_duration_secs?: number;
  };
  analysis?: {
    transcript_summary?: string;
    evaluation_criteria_results?: Record<string, unknown>;
  };
}

// ElevenLabs API response types
interface ElevenLabsSignedUrlResponse {
  signed_url: string;
}

interface ElevenLabsErrorResponse {
  detail?: string;
}

@Injectable()
export class AiInterviewService {
  private readonly elevenLabsBaseUrl: string;

  constructor(
    @InjectModel(Interview.name)
    private interviewModel: Model<InterviewDocument>,
    @InjectModel(Agent.name)
    private agentModel: Model<AgentDocument>,
    private configService: ConfigService,
  ) {
    this.elevenLabsBaseUrl = this.configService.get<string>(
      'elevenlabs.baseUrl',
      'https://api.elevenlabs.io/v1',
    );
  }

  /**
   * List interviews with filters and pagination
   */
  async listInterviews(
    query: ListInterviewsDto,
  ): Promise<PaginatedResult<InterviewDocument>> {
    const { difficulty, tag, search, page = 1, limit = 10 } = query;

    // Build filter
    const filter: Record<string, unknown> = { isActive: true };

    if (difficulty) {
      filter.difficulty = difficulty;
    }

    if (tag) {
      filter.tags = { $in: [tag] };
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    // Get total count for pagination
    const total = await this.interviewModel.countDocuments(filter);

    // Calculate pagination
    const skip = (page - 1) * limit;
    const totalPages = Math.ceil(total / limit);

    // Fetch interviews with agent populated
    const interviews = await this.interviewModel
      .find(filter)
      .populate('agent', 'name company role photo')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();

    return {
      data: interviews,
      pagination: {
        total,
        page,
        limit,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };
  }

  /**
   * Get single interview by ID
   */
  async getInterviewById(id: string): Promise<InterviewDocument> {
    const interview = await this.interviewModel
      .findOne({ _id: id, isActive: true })
      .populate('agent', 'name company role photo elevenLabsAgentId')
      .exec();

    if (!interview) {
      throw new NotFoundException('Interview not found');
    }

    return interview;
  }

  /**
   * Get all unique tags from active interviews (for filter dropdowns)
   */
  async getAllTags(): Promise<string[]> {
    const result = await this.interviewModel.distinct('tags', {
      isActive: true,
    });
    return result.sort();
  }

  /**
   * Get signed URL from ElevenLabs for starting a conversation
   * This keeps the API key secure on the server side
   */
  async getSignedUrl(interviewId: string): Promise<SignedUrlResponse> {
    // Get the interview with agent populated (including systemPrompt for overrides)
    const interview = await this.interviewModel
      .findOne({ _id: interviewId, isActive: true })
      .populate<{
        agent: AgentDocument;
      }>('agent', 'name company role photo elevenLabsAgentId')
      .exec();

    if (!interview) {
      throw new NotFoundException('Interview not found');
    }

    const agent = interview.agent;
    if (!agent || !agent.elevenLabsAgentId) {
      throw new BadRequestException('Interview agent not configured');
    }

    const apiKey = this.configService.get<string>('elevenlabs.apiKey');
    if (!apiKey) {
      throw new InternalServerErrorException(
        'ElevenLabs API key not configured',
      );
    }

    try {
      // Call ElevenLabs API to get signed URL
      const response = await axios.get<ElevenLabsSignedUrlResponse>(
        `${this.elevenLabsBaseUrl}/convai/conversation/get-signed-url`,
        {
          params: {
            agent_id: agent.elevenLabsAgentId,
          },
          headers: {
            'xi-api-key': apiKey,
          },
        },
      );

      return {
        signedUrl: response.data.signed_url,
        agentId: agent.elevenLabsAgentId,
        interviewId: interviewId,

        // Agent info
        agentName: agent.name,
        agentCompany: agent.company,
        agentRole: agent.role,
        agentPhoto: agent.photo,

        // For ElevenLabs Overrides (from Interview, not Agent)
        systemPrompt: interview.systemPrompt,

        // Interview context
        interviewName: interview.name,
        durationMins: interview.durationMins,
      };
    } catch (error) {
      if (axios.isAxiosError<ElevenLabsErrorResponse>(error)) {
        console.error(
          'ElevenLabs API error:',
          error.response?.data || error.message,
        );
        throw new InternalServerErrorException(
          `Failed to get signed URL: ${error.response?.data?.detail || error.message}`,
        );
      }
      throw new InternalServerErrorException('Failed to get signed URL');
    }
  }

  /**
   * Get conversation details from ElevenLabs API
   * Includes transcript, audio URL, and metadata
   */
  async getConversation(
    conversationId: string,
  ): Promise<ElevenLabsConversation> {
    const apiKey = this.configService.get<string>('elevenlabs.apiKey');
    if (!apiKey) {
      throw new InternalServerErrorException(
        'ElevenLabs API key not configured',
      );
    }

    try {
      const response = await axios.get<ElevenLabsConversation>(
        `${this.elevenLabsBaseUrl}/convai/conversations/${conversationId}`,
        {
          headers: {
            'xi-api-key': apiKey,
          },
        },
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError<ElevenLabsErrorResponse>(error)) {
        console.error(
          'ElevenLabs API error:',
          error.response?.data || error.message,
        );
        throw new InternalServerErrorException(
          `Failed to get conversation: ${error.response?.data?.detail || error.message}`,
        );
      }
      throw new InternalServerErrorException('Failed to get conversation');
    }
  }

  /**
   * Get audio URL for a conversation from ElevenLabs
   */
  async getConversationAudioUrl(
    conversationId: string,
  ): Promise<string | null> {
    const apiKey = this.configService.get<string>('elevenlabs.apiKey');
    if (!apiKey) {
      throw new InternalServerErrorException(
        'ElevenLabs API key not configured',
      );
    }

    try {
      // ElevenLabs provides audio via a separate endpoint
      const response = await axios.get(
        `${this.elevenLabsBaseUrl}/convai/conversations/${conversationId}/audio`,
        {
          headers: {
            'xi-api-key': apiKey,
          },
          responseType: 'arraybuffer',
        },
      );

      // For now, return null as we'd need to store this audio somewhere
      // In production, you might upload to S3/CloudStorage and return the URL
      const audioData = response.data as ArrayBuffer;
      console.log(
        `Audio retrieved for conversation ${conversationId}, size: ${audioData.byteLength} bytes`,
      );
      return null;
    } catch {
      // Audio might not be available for all conversations
      console.warn(`Could not get audio for conversation ${conversationId}`);
      return null;
    }
  }
}
