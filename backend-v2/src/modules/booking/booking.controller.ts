import { Controller } from '@nestjs/common';
import { BookingService } from './booking.service';

// Booking routes have been moved to:
// - User bookings: /user/:userId/bookings?status=upcoming|previous
// - Mentor bookings: /mentor/:userId/bookings?status=upcoming|previous
// - Create booking: /user/:userId/booking

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}
}
