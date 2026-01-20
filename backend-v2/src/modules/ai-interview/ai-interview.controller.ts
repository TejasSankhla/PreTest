import { Controller, Get, Post, Param, Query, UseGuards } from '@nestjs/common';
import { AiInterviewService } from './ai-interview.service';
import { ListInterviewsDto } from './dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('ai-interview')
export class AiInterviewController {
  constructor(private readonly aiInterviewService: AiInterviewService) {}

  /**
   * GET /api/ai-interview
   * List all active interviews with filters and pagination
   *
   * Query params:
   * - difficulty: 'Easy' | 'Medium' | 'Hard'
   * - tag: string (filter by tag)
   * - search: string (search in name/description)
   * - page: number (default: 1)
   * - limit: number (default: 10, max: 50)
   */
  @Get()
  async listInterviews(@Query() query: ListInterviewsDto) {
    const result = await this.aiInterviewService.listInterviews(query);

    return {
      data: result,
      success: true,
      msg: 'Interviews fetched successfully',
      err: null,
    };
  }

  /**
   * GET /api/ai-interview/tags
   * Get all unique tags for filter dropdown
   */
  @Get('tags')
  async getTags() {
    const tags = await this.aiInterviewService.getAllTags();

    return {
      data: { tags },
      success: true,
      msg: 'Tags fetched successfully',
      err: null,
    };
  }

  /**
   * POST /api/ai-interview/:id/session/start
   * Get signed URL to start an ElevenLabs conversation session
   *
   * Returns a signed URL that can be used with the ElevenLabs
   * Conversational AI widget to start the interview
   *
   * @requires Authentication - JWT token required
   */
  @Post(':id/session/start')
  @UseGuards(JwtAuthGuard)
  async startSession(@Param('id') id: string) {
    const result = await this.aiInterviewService.getSignedUrl(id);

    return {
      data: result,
      success: true,
      msg: 'Session started successfully',
      err: null,
    };
  }

  /**
   * GET /api/ai-interview/session/:conversationId/results
   * Get session results from ElevenLabs conversation
   *
   * Returns transcript, duration, and metadata for a completed interview session
   *
   * @requires Authentication - JWT token required
   */
  @Get('session/:conversationId/results')
  @UseGuards(JwtAuthGuard)
  async getSessionResults(@Param('conversationId') conversationId: string) {
    const result =
      await this.aiInterviewService.getConversation(conversationId);

    // Calculate session summary from conversation data
    const transcript = result.transcript || [];
    const userMessages = transcript.filter((t) => t.role === 'user');
    const agentMessages = transcript.filter((t) => t.role === 'agent');

    return {
      data: {
        conversationId: result.conversation_id,
        status: result.status,
        transcript,
        duration: result.metadata?.call_duration_secs || 0,
        startTime: result.metadata?.start_time_unix_secs
          ? new Date(result.metadata.start_time_unix_secs * 1000).toISOString()
          : null,
        endTime: result.metadata?.end_time_unix_secs
          ? new Date(result.metadata.end_time_unix_secs * 1000).toISOString()
          : null,
        questionsAnswered: userMessages.length,
        questionsAsked: agentMessages.length,
        analysis: result.analysis,
      },
      success: true,
      msg: 'Session results fetched successfully',
      err: null,
    };
  }

  /**
   * GET /api/ai-interview/:id
   * Get single interview details
   */
  @Get(':id')
  async getInterview(@Param('id') id: string) {
    const interview = await this.aiInterviewService.getInterviewById(id);

    return {
      data: { interview },
      success: true,
      msg: 'Interview fetched successfully',
      err: null,
    };
  }
}
