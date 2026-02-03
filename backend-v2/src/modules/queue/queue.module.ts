import { Module, Global } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EvaluationProcessor } from './evaluation/evaluation.processor';
import {
  EvaluationQueueService,
  EVALUATION_QUEUE,
} from './evaluation/evaluation.queue';
import { EVALUATION_JOB_CONFIG } from './evaluation/evaluation.types';
import {
  InterviewAttempt,
  InterviewAttemptSchema,
} from '../../schemas/interview-attempt.schema';
import { Interview, InterviewSchema } from '../../schemas/interview.schema';
import { Rubric, RubricSchema } from '../../schemas/rubric.schema';
import { OpenAIService } from '../../services/openai.service';
import { EvaluationService } from '../../services/evaluation.service';
import { AiInterviewModule } from '../ai-interview/ai-interview.module';

@Global()
@Module({
  imports: [
    // BullMQ root configuration
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        connection: {
          host: configService.get<string>('redis.host', 'localhost'),
          port: configService.get<number>('redis.port', 6379),
          password: configService.get<string>('redis.password') || undefined,
          tls: configService.get<boolean>('redis.tls') ? {} : undefined,
        },
      }),
      inject: [ConfigService],
    }),

    // Register evaluation queue with 3 retries, 3s exponential backoff
    BullModule.registerQueue({
      name: EVALUATION_QUEUE,
      defaultJobOptions: {
        attempts: EVALUATION_JOB_CONFIG.attempts,
        backoff: EVALUATION_JOB_CONFIG.backoff,
        removeOnComplete: 100, // Keep last 100 completed jobs
        removeOnFail: 500, // Keep last 500 failed jobs for debugging
      },
    }),

    // Mongoose schemas needed by processor
    MongooseModule.forFeature([
      { name: InterviewAttempt.name, schema: InterviewAttemptSchema },
      { name: Interview.name, schema: InterviewSchema },
      { name: Rubric.name, schema: RubricSchema },
    ]),

    // Import AiInterviewModule for getConversation()
    AiInterviewModule,
  ],
  providers: [
    EvaluationProcessor,
    EvaluationQueueService,
    OpenAIService,
    EvaluationService,
  ],
  exports: [EvaluationQueueService],
})
export class QueueModule {}
