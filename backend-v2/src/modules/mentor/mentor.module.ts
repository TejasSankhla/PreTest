import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MentorController } from './mentor.controller';
import { MentorService } from './mentor.service';
import { Mentor, MentorSchema } from '../../schemas/mentor.schema';
import { Booking, BookingSchema } from '../../schemas/booking.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Mentor.name, schema: MentorSchema },
      { name: Booking.name, schema: BookingSchema },
    ]),
    AuthModule,
  ],
  controllers: [MentorController],
  providers: [MentorService],
  exports: [MentorService],
})
export class MentorModule {}
