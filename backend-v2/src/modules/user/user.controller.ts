import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Query,
  HttpStatus,
  HttpCode,
  UseGuards,
  Request,
  ForbiddenException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { BookingService } from '../booking/booking.service';
import { CreateBookingDto } from '../booking/dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

// Extended DTO for user booking creation (includes mentorId)
interface CreateUserBookingDto extends CreateBookingDto {
  mentorId: string;
}

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly bookingService: BookingService,
  ) {}

  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() createUserDto: CreateUserDto) {
    const { user, token } = await this.userService.signUp(createUserDto);
    return {
      data: { user, token },
      success: true,
      msg: 'User created successfully',
      err: null,
    };
  }

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() loginUserDto: LoginUserDto) {
    const { user, token } = await this.userService.signIn(loginUserDto);
    return {
      data: { user, token },
      success: true,
      msg: 'User logged in successfully',
      err: null,
    };
  }

  // POST /user/:userId/booking - create a booking for user with a mentor
  @Post(':userId/booking')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async createBooking(
    @Param('userId') userId: string,
    @Body() createBookingDto: CreateUserBookingDto,
    @Request() req: { user: { UserId: string } },
  ) {
    // Verify the authenticated user matches the userId param
    if (String(req.user.UserId) !== String(userId)) {
      throw new ForbiddenException('You can only create bookings for yourself');
    }

    const booking = await this.bookingService.createBookingForUser(
      userId,
      createBookingDto,
    );
    return {
      data: booking,
      success: true,
      msg: 'Booking created with link',
      err: null,
    };
  }

  // GET /user/:userId/bookings?status=upcoming|previous - fetch user bookings
  @Get(':userId/bookings')
  async getUserBookings(
    @Param('userId') userId: string,
    @Query('status') status: string,
  ) {
    const isUpcoming = status === 'upcoming';
    const bookings = await this.bookingService.fetchUserBookings(
      userId,
      isUpcoming,
    );
    return {
      data: bookings,
      success: true,
      msg: 'Bookings fetched successfully',
      err: null,
    };
  }
}
