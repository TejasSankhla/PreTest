import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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

@Injectable()
export class AiInterviewService {
  constructor(
    @InjectModel(Interview.name)
    private interviewModel: Model<InterviewDocument>,
    @InjectModel(Agent.name)
    private agentModel: Model<AgentDocument>,
  ) {}

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
    const result = await this.interviewModel.distinct('tags', { isActive: true });
    return result.sort();
  }
}
