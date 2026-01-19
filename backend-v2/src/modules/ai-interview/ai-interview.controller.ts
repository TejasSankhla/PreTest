import { Controller, Get, Param, Query } from '@nestjs/common';
import { AiInterviewService } from './ai-interview.service';
import { ListInterviewsDto } from './dto';

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
