import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { Booking, BookingSchema } from '../../schemas/booking.schema';
import { PaymentService } from '../../services/payment.service';
import { CalendarService } from '../../services/calendar.service';
import { EmailService } from '../../services/email.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Booking.name, schema: BookingSchema }]),
  ],
  controllers: [BookingController],
  providers: [BookingService, PaymentService, CalendarService, EmailService],
  exports: [BookingService],
})
export class BookingModule {}
