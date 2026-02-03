import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  InterviewAttempt,
  InterviewAttemptDocument,
  AttemptStatus,
  Platform,
} from '../../schemas/interview-attempt.schema';
import { Interview, InterviewDocument } from '../../schemas/interview.schema';
import { CreateAttemptDto, ListAttemptsDto } from './dto';
import { PaginatedResult } from '../../types/common.types';
import { EvaluationQueueService } from '../queue/evaluation/evaluation.queue';

export interface AttemptStatusResponse {
  attemptId: string;
  status: AttemptStatus;
  updatedAt: Date;
  evaluation?: {
    overallScore: number;
    overallFeedback: string;
  };
}

@Injectable()
export class InterviewAttemptService {
  private readonly logger = new Logger(InterviewAttemptService.name);

  constructor(
    @InjectModel(InterviewAttempt.name)
    private attemptModel: Model<InterviewAttemptDocument>,
    @InjectModel(Interview.name)
    private interviewModel: Model<InterviewDocument>,
    private evaluationQueueService: EvaluationQueueService,
  ) {}

  // ─────────────────────────────────────────────────────────────────────────
  // CREATE ATTEMPT
  // Creates attempt after WebSocket connected (we have conversation ID)
  // ─────────────────────────────────────────────────────────────────────────

  async createAttempt(
    userId: string,
    interviewId: string,
    dto: CreateAttemptDto,
  ): Promise<InterviewAttemptDocument> {
    // Verify interview exists and is active
    const interview = await this.interviewModel
      .findOne({ _id: interviewId, isActive: true })
      .exec();

    if (!interview) {
      throw new NotFoundException('Interview not found');
    }

    // Check if conversation ID is already used (prevent duplicates)
    const existingAttempt = await this.attemptModel.findOne({
      elevenLabsConversationId: dto.conversationId,
    });

    if (existingAttempt) {
      throw new BadRequestException(
        'An attempt with this conversation ID already exists',
      );
    }

    // Create attempt directly in IN_PROGRESS state since we already have conversation
    const attempt = new this.attemptModel({
      user: new Types.ObjectId(userId),
      interview: new Types.ObjectId(interviewId),
      status: AttemptStatus.IN_PROGRESS,
      elevenLabsConversationId: dto.conversationId,
      startedAt: new Date(),
      platform: dto.platform || Platform.WEB,
    });

    return attempt.save();
  }

  // ─────────────────────────────────────────────────────────────────────────
  // END ATTEMPT
  // ─────────────────────────────────────────────────────────────────────────

  async endAttempt(
    userId: string,
    attemptId: string,
  ): Promise<InterviewAttemptDocument & { evaluationJobId?: string }> {
    const attempt = await this.findByIdAndVerifyOwner(userId, attemptId);

    // Can only end an in-progress attempt
    if (attempt.status !== AttemptStatus.IN_PROGRESS) {
      throw new BadRequestException(
        `Cannot end attempt with status: ${attempt.status}`,
      );
    }

    // Validate conversation ID exists for evaluation
    if (!attempt.elevenLabsConversationId) {
      throw new BadRequestException('Attempt has no conversation ID');
    }

    attempt.status = AttemptStatus.COMPLETED;
    attempt.completedAt = new Date();

    // Calculate duration if we have startedAt
    if (attempt.startedAt) {
      attempt.durationSeconds = Math.floor(
        (attempt.completedAt.getTime() - attempt.startedAt.getTime()) / 1000,
      );
    }

    await attempt.save();

    // Queue evaluation job
    const jobId = await this.evaluationQueueService.queueEvaluation({
      attemptId: attempt._id.toString(),
      conversationId: attempt.elevenLabsConversationId,
      userId,
      /* eslint-disable-next-line @typescript-eslint/no-base-to-string */
      interviewId: String(attempt.interview),
    });

    this.logger.log(`Queued evaluation job ${jobId} for attempt ${attemptId}`);

    // Return attempt with job ID
    const attemptObj = attempt.toObject() as InterviewAttemptDocument & {
      evaluationJobId?: string;
    };
    attemptObj.evaluationJobId = jobId;
    return attemptObj;
  }

  // ─────────────────────────────────────────────────────────────────────────
  // ABANDON ATTEMPT
  // ─────────────────────────────────────────────────────────────────────────

  async abandonAttempt(
    userId: string,
    attemptId: string,
  ): Promise<InterviewAttemptDocument> {
    const attempt = await this.findByIdAndVerifyOwner(userId, attemptId);

    // Can only abandon pending or in-progress attempts
    if (
      attempt.status !== AttemptStatus.PENDING &&
      attempt.status !== AttemptStatus.IN_PROGRESS
    ) {
      throw new BadRequestException(
        `Cannot abandon attempt with status: ${attempt.status}`,
      );
    }

    attempt.status = AttemptStatus.ABANDONED;
    attempt.completedAt = new Date();

    // Calculate duration if we have startedAt
    if (attempt.startedAt) {
      attempt.durationSeconds = Math.floor(
        (attempt.completedAt.getTime() - attempt.startedAt.getTime()) / 1000,
      );
    }

    return attempt.save();
  }

  // ─────────────────────────────────────────────────────────────────────────
  // LIST ATTEMPTS
  // ─────────────────────────────────────────────────────────────────────────

  async listAttempts(
    userId: string,
    query: ListAttemptsDto,
  ): Promise<PaginatedResult<InterviewAttemptDocument>> {
    const { interviewId, status, page = 1, limit = 10 } = query;

    // Build filter - always filter by user
    const filter: Record<string, unknown> = {
      user: new Types.ObjectId(userId),
    };

    if (interviewId) {
      filter.interview = new Types.ObjectId(interviewId);
    }

    if (status) {
      filter.status = status;
    }

    // Get total count
    const total = await this.attemptModel.countDocuments(filter);

    // Calculate pagination
    const skip = (page - 1) * limit;
    const totalPages = Math.ceil(total / limit);

    // Fetch attempts with interview populated
    const attempts = await this.attemptModel
      .find(filter)
      .populate({
        path: 'interview',
        select: 'name description difficulty durationMins tags stages',
        populate: {
          path: 'agent',
          select: 'name role company photo',
        },
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();

    return {
      data: attempts,
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

  // ─────────────────────────────────────────────────────────────────────────
  // GET SINGLE ATTEMPT
  // ─────────────────────────────────────────────────────────────────────────

  async getAttempt(
    userId: string,
    attemptId: string,
  ): Promise<InterviewAttemptDocument> {
    const attempt = await this.attemptModel
      .findById(attemptId)
      .populate({
        path: 'interview',
        select: 'name description difficulty durationMins tags stages role',
        populate: {
          path: 'agent',
          select: 'name role company photo',
        },
      })
      .exec();

    if (!attempt) {
      throw new NotFoundException('Attempt not found');
    }

    // Verify ownership
    /* eslint-disable-next-line @typescript-eslint/no-base-to-string */
    if (attempt.user.toString() !== userId) {
      throw new ForbiddenException('Not authorized to view this attempt');
    }

    return attempt;
  }

  // ─────────────────────────────────────────────────────────────────────────
  // GET ATTEMPT STATUS (Lightweight for polling)
  // ─────────────────────────────────────────────────────────────────────────

  async getAttemptStatus(
    userId: string,
    attemptId: string,
  ): Promise<AttemptStatusResponse> {
    const attempt = await this.attemptModel
      .findById(attemptId)
      .select(
        'user status updatedAt evaluation.overallScore evaluation.overallFeedback',
      )
      .lean<InterviewAttemptDocument & { updatedAt: Date }>()
      .exec();

    if (!attempt) {
      throw new NotFoundException('Attempt not found');
    }

    // Verify ownership
    /* eslint-disable-next-line @typescript-eslint/no-base-to-string */
    if (attempt.user.toString() !== userId) {
      throw new ForbiddenException('Not authorized to view this attempt');
    }

    const response: AttemptStatusResponse = {
      attemptId: String(attempt._id),
      status: attempt.status,
      updatedAt: attempt.updatedAt,
    };

    // Include basic evaluation info if evaluated
    if (attempt.status === AttemptStatus.EVALUATED && attempt.evaluation) {
      response.evaluation = {
        overallScore: attempt.evaluation.overallScore,
        overallFeedback: attempt.evaluation.overallFeedback,
      };
    }

    return response;
  }

  // ─────────────────────────────────────────────────────────────────────────
  // GET REPLAY DATA
  // ─────────────────────────────────────────────────────────────────────────

  async getReplayData(userId: string, attemptId: string) {
    const attempt = await this.getAttempt(userId, attemptId);

    // Can only replay completed/evaluated attempts
    if (
      attempt.status !== AttemptStatus.COMPLETED &&
      attempt.status !== AttemptStatus.EVALUATED &&
      attempt.status !== AttemptStatus.EVALUATING
    ) {
      throw new BadRequestException(
        `Cannot replay attempt with status: ${attempt.status}`,
      );
    }

    return {
      attemptId: attempt._id.toString(),
      interview: attempt.interview,
      audioUrl: attempt.audioUrl,
      transcript: attempt.transcript,
      evaluation: attempt.evaluation,
      startedAt: attempt.startedAt,
      completedAt: attempt.completedAt,
      durationSeconds: attempt.durationSeconds,
    };
  }

  // ─────────────────────────────────────────────────────────────────────────
  // FIND BY CONVERSATION ID (For webhook lookups)
  // ─────────────────────────────────────────────────────────────────────────

  async findByConversationId(
    conversationId: string,
  ): Promise<InterviewAttemptDocument | null> {
    return this.attemptModel
      .findOne({ elevenLabsConversationId: conversationId })
      .exec();
  }

  // ─────────────────────────────────────────────────────────────────────────
  // HELPER: Find by ID and verify owner
  // ─────────────────────────────────────────────────────────────────────────

  private async findByIdAndVerifyOwner(
    userId: string,
    attemptId: string,
  ): Promise<InterviewAttemptDocument> {
    const attempt = await this.attemptModel.findById(attemptId).exec();

    if (!attempt) {
      throw new NotFoundException('Attempt not found');
    }

    /* eslint-disable-next-line @typescript-eslint/no-base-to-string */
    if (attempt.user.toString() !== userId) {
      throw new ForbiddenException('Not authorized to access this attempt');
    }

    return attempt;
  }
}
