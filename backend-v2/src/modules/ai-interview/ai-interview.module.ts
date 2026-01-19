import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AiInterviewController } from './ai-interview.controller';
import { AiInterviewService } from './ai-interview.service';
import { Interview, InterviewSchema } from '../../schemas/interview.schema';
import { Agent, AgentSchema } from '../../schemas/agent.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Interview.name, schema: InterviewSchema },
      { name: Agent.name, schema: AgentSchema },
    ]),
  ],
  controllers: [AiInterviewController],
  providers: [AiInterviewService],
  exports: [AiInterviewService],
})
export class AiInterviewModule {}
