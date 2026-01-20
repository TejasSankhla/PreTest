import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InterviewAttemptController } from './interview-attempt.controller';
import { InterviewAttemptService } from './interview-attempt.service';
import {
  InterviewAttempt,
  InterviewAttemptSchema,
} from '../../schemas/interview-attempt.schema';
import { Interview, InterviewSchema } from '../../schemas/interview.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: InterviewAttempt.name, schema: InterviewAttemptSchema },
      { name: Interview.name, schema: InterviewSchema },
    ]),
  ],
  controllers: [InterviewAttemptController],
  providers: [InterviewAttemptService],
  exports: [InterviewAttemptService],
})
export class InterviewAttemptModule {}
