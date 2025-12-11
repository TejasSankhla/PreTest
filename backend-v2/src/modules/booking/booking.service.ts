import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking, BookingDocument } from '../../schemas/booking.schema';
import { PaymentService } from '../../services/payment.service';
import { CalendarService } from '../../services/calendar.service';
import { EmailService } from '../../services/email.service';
import { CreateBookingDto } from './dto';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<BookingDocument>,
    private readonly paymentService: PaymentService,
    private readonly calendarService: CalendarService,
    private readonly emailService: EmailService,
  ) {}

  async fetchUserBookings(
    userId: string,
    upcoming: boolean,
  ): Promise<BookingDocument[]> {
    const currDate = new Date();
    const sortOrder = upcoming ? 1 : -1;

    const bookings = await this.bookingModel
      .find({
        client: userId,
        slot: upcoming ? { $gt: currDate } : { $lt: currDate },
      })
      .sort({ slot: sortOrder })
      .populate('mentor', 'name college profile_pic branch')
      .exec();

    return bookings;
  }

  async fetchMentorBookings(
    userId: string,
    upcoming: boolean,
  ): Promise<BookingDocument[]> {
    const currDate = new Date();
    const sortOrder = upcoming ? 1 : -1;

    const bookings = await this.bookingModel
      .find({
        mentor: userId,
        slot: upcoming ? { $gt: currDate } : { $lt: currDate },
      })
      .sort({ slot: sortOrder })
      .populate('client', 'name email mobile_number')
      .exec();

    return bookings;
  }

  // Create booking for user (userId is the client, mentorId is in body)
  async createBookingForUser(
    userId: string,
    createBookingDto: CreateBookingDto & { mentorId: string },
  ): Promise<BookingDocument> {
    const { paymentResponse, mentorId, slot } = createBookingDto;

    // Verify payment signature
    const isValid = this.paymentService.verifyPaymentSignature(
      paymentResponse.razorpay_order_id,
      paymentResponse.razorpay_payment_id,
      paymentResponse.razorpay_signature,
    );

    if (!isValid) {
      throw new BadRequestException('Invalid payment signature');
    }

    // Create booking
    const bookingDetails = {
      mentor: mentorId,
      client: userId,
      slot: new Date(slot),
    };

    const newBooking = await this.bookingModel.create(bookingDetails);

    // Populate mentor and client details
    const populatedBooking = await this.bookingModel
      .findById(newBooking._id)
      .populate('mentor', 'email name')
      .populate('client', 'email name')
      .exec();

    if (!populatedBooking) {
      throw new BadRequestException('Failed to create booking');
    }

    // Send confirmation emails
    await this.emailService.sendBookingConfirmationEmail({
      client: {
        name: (populatedBooking.client as any).name,
        email: (populatedBooking.client as any).email,
      },
      mentor: {
        name: (populatedBooking.mentor as any).name,
        email: (populatedBooking.mentor as any).email,
      },
      slot: populatedBooking.slot,
    });

    // Create Google Calendar event with Meet link
    const meetingLink = await this.calendarService.createEvent({
      startTime: populatedBooking.slot,
      summary: `1:1 Mentorship Session with ${(populatedBooking.mentor as any).name}`,
      location: 'Virtual',
      client: (populatedBooking.client as any).email,
      mentor: (populatedBooking.mentor as any).email,
    });

    // Update booking with meeting link
    const updatedBooking = await this.bookingModel
      .findByIdAndUpdate(
        newBooking._id,
        { meeting_link: meetingLink },
        { new: true },
      )
      .populate('mentor', 'email name')
      .populate('client', 'email name')
      .exec();

    return updatedBooking as BookingDocument;
  }
}
