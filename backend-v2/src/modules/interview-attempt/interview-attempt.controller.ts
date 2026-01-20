import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { InterviewAttemptService } from './interview-attempt.service';
import { CreateAttemptDto, ListAttemptsDto } from './dto';

// JWT payload structure (attached to request by passport)
interface JwtUser {
  UserId: string;
  email: string;
  type: 'user' | 'mentor';
}

interface AuthenticatedRequest extends Request {
  user: JwtUser;
}

@Controller()
export class InterviewAttemptController {
  constructor(private readonly attemptService: InterviewAttemptService) {}

  // ─────────────────────────────────────────────────────────────────────────
  // CREATE ATTEMPT
  // POST /api/interviews/:interviewId/attempts
  // Called after frontend connects WebSocket and has conversation ID
  // ─────────────────────────────────────────────────────────────────────────

  @Post('interviews/:interviewId/attempts')
  @UseGuards(JwtAuthGuard)
  async createAttempt(
    @Param('interviewId') interviewId: string,
    @Body() dto: CreateAttemptDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const attempt = await this.attemptService.createAttempt(
      req.user.UserId,
      interviewId,
      dto,
    );

    return {
      data: {
        attemptId: attempt._id.toString(),
        /* eslint-disable-next-line @typescript-eslint/no-base-to-string */
        interviewId: attempt.interview.toString(),
        status: attempt.status,
        startedAt: attempt.startedAt,
        conversationId: attempt.elevenLabsConversationId,
      },
      success: true,
      msg: 'Attempt created successfully',
      err: null,
    };
  }

  // ─────────────────────────────────────────────────────────────────────────
  // END ATTEMPT
  // POST /api/attempts/:id/end
  // ─────────────────────────────────────────────────────────────────────────

  @Post('attempts/:id/end')
  @UseGuards(JwtAuthGuard)
  async endAttempt(
    @Param('id') attemptId: string,
    @Req() req: AuthenticatedRequest,
  ) {
    const attempt = await this.attemptService.endAttempt(
      req.user.UserId,
      attemptId,
    );

    return {
      data: {
        attemptId: attempt._id.toString(),
        status: attempt.status,
        completedAt: attempt.completedAt,
        durationSeconds: attempt.durationSeconds,
      },
      success: true,
      msg: 'Attempt ended successfully',
      err: null,
    };
  }

  // ─────────────────────────────────────────────────────────────────────────
  // ABANDON ATTEMPT
  // POST /api/attempts/:id/abandon
  // ─────────────────────────────────────────────────────────────────────────

  @Post('attempts/:id/abandon')
  @UseGuards(JwtAuthGuard)
  async abandonAttempt(
    @Param('id') attemptId: string,
    @Req() req: AuthenticatedRequest,
  ) {
    const attempt = await this.attemptService.abandonAttempt(
      req.user.UserId,
      attemptId,
    );

    return {
      data: {
        attemptId: attempt._id.toString(),
        status: attempt.status,
      },
      success: true,
      msg: 'Attempt abandoned',
      err: null,
    };
  }

  // ─────────────────────────────────────────────────────────────────────────
  // LIST ATTEMPTS
  // GET /api/attempts
  // ─────────────────────────────────────────────────────────────────────────

  @Get('attempts')
  @UseGuards(JwtAuthGuard)
  async listAttempts(
    @Query() query: ListAttemptsDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const result = await this.attemptService.listAttempts(
      req.user.UserId,
      query,
    );

    return {
      data: result,
      success: true,
      msg: 'Attempts fetched successfully',
      err: null,
    };
  }

  // ─────────────────────────────────────────────────────────────────────────
  // GET SINGLE ATTEMPT
  // GET /api/attempts/:id
  // ─────────────────────────────────────────────────────────────────────────

  @Get('attempts/:id')
  @UseGuards(JwtAuthGuard)
  async getAttempt(
    @Param('id') attemptId: string,
    @Req() req: AuthenticatedRequest,
  ) {
    const attempt = await this.attemptService.getAttempt(
      req.user.UserId,
      attemptId,
    );

    return {
      data: { attempt },
      success: true,
      msg: 'Attempt fetched successfully',
      err: null,
    };
  }

  // ─────────────────────────────────────────────────────────────────────────
  // GET ATTEMPT STATUS (Lightweight for polling)
  // GET /api/attempts/:id/status
  // ─────────────────────────────────────────────────────────────────────────

  @Get('attempts/:id/status')
  @UseGuards(JwtAuthGuard)
  async getAttemptStatus(
    @Param('id') attemptId: string,
    @Req() req: AuthenticatedRequest,
  ) {
    const status = await this.attemptService.getAttemptStatus(
      req.user.UserId,
      attemptId,
    );

    return {
      data: status,
      success: true,
      msg: 'Status fetched successfully',
      err: null,
    };
  }

  // ─────────────────────────────────────────────────────────────────────────
  // GET REPLAY DATA
  // GET /api/attempts/:id/replay
  // ─────────────────────────────────────────────────────────────────────────

  @Get('attempts/:id/replay')
  @UseGuards(JwtAuthGuard)
  async getReplayData(
    @Param('id') attemptId: string,
    @Req() req: AuthenticatedRequest,
  ) {
    const replay = await this.attemptService.getReplayData(
      req.user.UserId,
      attemptId,
    );

    return {
      data: replay,
      success: true,
      msg: 'Replay data fetched successfully',
      err: null,
    };
  }
}
