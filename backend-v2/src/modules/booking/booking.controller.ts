import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post(':userId')
  @HttpCode(HttpStatus.CREATED)
  async createBooking(
    @Param('userId') mentorId: string,
    @Body() createBookingDto: CreateBookingDto,
  ) {
    const booking = await this.bookingService.createBooking(
      mentorId,
      createBookingDto,
    );
    return {
      data: booking,
      success: true,
      msg: 'booking created with link',
      err: null,
    };
  }

  @Get('user/prev/:userId')
  async prevUserBookings(@Param('userId') userId: string) {
    const bookings = await this.bookingService.fetchUserBookings(userId, false);
    return {
      data: bookings,
      success: true,
      msg: 'bookings fetched successfully',
      err: null,
    };
  }

  @Get('user/upcoming/:userId')
  async upcomingUserBookings(@Param('userId') userId: string) {
    const bookings = await this.bookingService.fetchUserBookings(userId, true);
    return {
      data: bookings,
      success: true,
      msg: 'bookings fetched successfully',
      err: null,
    };
  }

  @Get('mentor/prev/:userId')
  async prevMentorBookings(@Param('userId') userId: string) {
    const bookings = await this.bookingService.fetchMentorBookings(
      userId,
      false,
    );
    return {
      data: bookings,
      success: true,
      msg: 'bookings fetched successfully',
      err: null,
    };
  }

  @Get('mentor/upcoming/:userId')
  async upcomingMentorBookings(@Param('userId') userId: string) {
    const bookings = await this.bookingService.fetchMentorBookings(
      userId,
      true,
    );
    return {
      data: bookings,
      success: true,
      msg: 'bookings fetched successfully',
      err: null,
    };
  }
}
