import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { ExpressAdapter } from '@bull-board/express';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { EVALUATION_QUEUE } from './evaluation/evaluation.queue';

@Module({
  imports: [
    // Import BullModule to access the registered queue
    BullModule.registerQueue({
      name: EVALUATION_QUEUE,
    }),
  ],
})
export class BullBoardModule implements NestModule {
  private serverAdapter: ExpressAdapter;

  constructor(@InjectQueue(EVALUATION_QUEUE) private evaluationQueue: Queue) {
    this.serverAdapter = new ExpressAdapter();
    this.serverAdapter.setBasePath('/admin/queues');

    createBullBoard({
      queues: [new BullMQAdapter(this.evaluationQueue)],
      serverAdapter: this.serverAdapter,
    });
  }

  configure(consumer: MiddlewareConsumer) {
    consumer

      .apply(
        this.serverAdapter.getRouter() as Parameters<typeof consumer.apply>[0],
      )
      .forRoutes('/admin/queues'); // Bull Board router handles all sub-routes
  }
}
