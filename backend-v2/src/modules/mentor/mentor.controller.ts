import {
  Controller,
  Post,
  Get,
  Patch,
  Put,
  Body,
  Param,
  Query,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { MentorService } from './mentor.service';
import {
  CreateMentorDto,
  LoginMentorDto,
  UpdateMentorDto,
  UpdateSlotsDto,
} from './dto';

@Controller('mentor')
export class MentorController {
  constructor(private readonly mentorService: MentorService) {}

  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() createMentorDto: CreateMentorDto) {
    const { mentor, token } = await this.mentorService.signUp(createMentorDto);
    return {
      data: { mentor, token },
      success: true,
      msg: 'Mentor created successfully',
      err: null,
    };
  }

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() loginMentorDto: LoginMentorDto) {
    const { mentor, token } = await this.mentorService.signIn(loginMentorDto);
    return {
      data: { mentor, token },
      success: true,
      msg: 'Mentor logged in successfully',
      err: null,
    };
  }

  // GET /mentor - fetch all mentors, optionally filter by college
  @Get()
  async getAllMentors(@Query('college') college?: string) {
    if (college) {
      const mentors = await this.mentorService.getAllMentorsFromCollege(college);
      return {
        data: mentors,
        success: true,
        msg: 'Mentors fetched successfully',
        err: null,
      };
    }
    const mentors = await this.mentorService.getAllMentors();
    return {
      data: mentors,
      success: true,
      msg: 'Mentors fetched successfully',
      err: null,
    };
  }

  // GET /mentor/:userId - fetch mentor profile
  @Get(':userId')
  async fetchMentorProfile(@Param('userId') userId: string) {
    const mentor = await this.mentorService.fetchMentorProfile(userId);
    return {
      data: mentor,
      success: true,
      msg: 'Mentor profile fetched successfully',
      err: null,
    };
  }

  // PATCH /mentor/:userId - update mentor profile
  @Patch(':userId')
  async updateMentor(
    @Param('userId') userId: string,
    @Body() updateMentorDto: UpdateMentorDto,
  ) {
    const updatedMentor = await this.mentorService.updateMentor(
      userId,
      updateMentorDto,
    );
    return {
      data: updatedMentor,
      success: true,
      msg: 'Mentor updated successfully',
      err: null,
    };
  }

  // PUT /mentor/:userId/slots - update mentor availability slots
  @Put(':userId/slots')
  async updateMentorAvailability(
    @Param('userId') userId: string,
    @Body() updateSlotsDto: UpdateSlotsDto,
  ) {
    const updatedMentor = await this.mentorService.updateMentorAvailability(
      userId,
      updateSlotsDto,
    );
    return {
      data: updatedMentor,
      success: true,
      msg: 'Mentor availability updated successfully',
      err: null,
    };
  }

  // GET /mentor/:userId/bookings?status=upcoming|previous - fetch mentor bookings
  @Get(':userId/bookings')
  async getMentorBookings(
    @Param('userId') userId: string,
    @Query('status') status: string,
  ) {
    const isUpcoming = status === 'upcoming';
    const bookings = await this.mentorService.fetchMentorBookings(userId, isUpcoming);
    return {
      data: bookings,
      success: true,
      msg: 'Bookings fetched successfully',
      err: null,
    };
  }
}
