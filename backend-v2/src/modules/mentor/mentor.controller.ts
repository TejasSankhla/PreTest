import {
  Controller,
  Post,
  Get,
  Patch,
  Put,
  Body,
  Param,
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

  @Get()
  async getAllMentors() {
    const mentors = await this.mentorService.getAllMentors();
    return {
      data: mentors,
      success: true,
      msg: 'Mentors fetched successfully',
      err: null,
    };
  }

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

  @Patch('update/:userId')
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

  @Put('slots/:userId')
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

  @Get('explore/:college')
  async getAllMentorsFromCollege(@Param('college') college: string) {
    const mentors = await this.mentorService.getAllMentorsFromCollege(college);
    return {
      data: mentors,
      success: true,
      msg: 'Mentors fetched successfully',
      err: null,
    };
  }
}
