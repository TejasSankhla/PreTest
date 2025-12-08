import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, LoginUserDto } from './dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

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

  // Note: Keeping the typo '/boookings' for backward compatibility
  @Get('boookings/:userId')
  async fetchUserBookings(@Param('userId') userId: string) {
    const bookings = await this.userService.fetchUserBookings(userId);
    return {
      data: bookings,
      success: true,
      msg: 'Bookings fetched successfully',
      err: null,
    };
  }
}
