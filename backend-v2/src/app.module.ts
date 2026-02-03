import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configs from './config';
import { validate } from './config/env.validation';
import { LoggingMiddleware } from './common/middleware/logging.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { MentorModule } from './modules/mentor/mentor.module';
import { OrderModule } from './modules/order/order.module';
import { BookingModule } from './modules/booking/booking.module';
import { AiInterviewModule } from './modules/ai-interview/ai-interview.module';
import { InterviewAttemptModule } from './modules/interview-attempt/interview-attempt.module';
import { QueueModule } from './modules/queue/queue.module';
import { BullBoardModule } from './modules/queue/bull-board.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: configs,
      validate,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('database.uri'),
      }),
      inject: [ConfigService],
    }),
    QueueModule, // Must be before modules that use EvaluationQueueService
    BullBoardModule, // Bull Board UI at /admin/queues
    AuthModule,
    UserModule,
    MentorModule,
    OrderModule,
    BookingModule,
    AiInterviewModule,
    InterviewAttemptModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
