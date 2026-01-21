import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WebhookController } from './webhook.controller';
import { ElevenLabsWebhookService } from './elevenlabs-webhook.service';
import {
  InterviewAttempt,
  InterviewAttemptSchema,
} from '../../schemas/interview-attempt.schema';
import { Interview, InterviewSchema } from '../../schemas/interview.schema';
import { Rubric, RubricSchema } from '../../schemas/rubric.schema';
import { OpenAIService } from '../../services/openai.service';
import { EvaluationService } from '../../services/evaluation.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: InterviewAttempt.name, schema: InterviewAttemptSchema },
      { name: Interview.name, schema: InterviewSchema },
      { name: Rubric.name, schema: RubricSchema },
    ]),
  ],
  controllers: [WebhookController],
  providers: [ElevenLabsWebhookService, OpenAIService, EvaluationService],
  exports: [ElevenLabsWebhookService],
})
export class WebhookModule {}
