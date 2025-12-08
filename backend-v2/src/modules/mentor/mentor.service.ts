import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import moment from 'moment';
import { Mentor, MentorDocument } from '../../schemas/mentor.schema';
import { Booking, BookingDocument } from '../../schemas/booking.schema';
import {
  CreateMentorDto,
  LoginMentorDto,
  UpdateMentorDto,
  UpdateSlotsDto,
} from './dto';
import {
  convertToLowerCase,
  trimBlankSpace,
} from '../../common/utils/helper';

@Injectable()
export class MentorService {
  constructor(
    @InjectModel(Mentor.name) private mentorModel: Model<MentorDocument>,
    @InjectModel(Booking.name) private bookingModel: Model<BookingDocument>,
  ) {}

  async signUp(
    createMentorDto: CreateMentorDto,
  ): Promise<{ mentor: MentorDocument; token: string }> {
    try {
      // Normalize data
      const mentorData = {
        ...createMentorDto,
        username: convertToLowerCase(createMentorDto.username),
        name: trimBlankSpace(createMentorDto.name),
        college: trimBlankSpace(createMentorDto.college),
        branch: trimBlankSpace(createMentorDto.branch),
      };

      const newMentor = await this.mentorModel.create(mentorData);
      const token = newMentor.createToken();
      return { mentor: newMentor, token };
    } catch (error: any) {
      if (error.code === 11000) {
        throw new ConflictException('Username/email already exists');
      }
      throw error;
    }
  }

  async signIn(
    loginMentorDto: LoginMentorDto,
  ): Promise<{ mentor: MentorDocument; token: string }> {
    const { email, password } = loginMentorDto;

    const mentor = await this.mentorModel.findOne({ email });
    if (!mentor) {
      throw new NotFoundException("Mentor doesn't exist, Please Sign-Up");
    }

    const isPasswordValid = mentor.comparePassword(password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Incorrect password');
    }

    const token = mentor.createToken();
    return { mentor, token };
  }

  async getMentorByEmail(email: string): Promise<MentorDocument> {
    const mentor = await this.mentorModel.findOne({ email });
    if (!mentor) {
      throw new NotFoundException("Mentor doesn't exist, Please Sign-Up");
    }
    return mentor;
  }

  async getAllMentors(): Promise<MentorDocument[]> {
    return this.mentorModel.find();
  }

  async getAllMentorsFromCollege(college: string): Promise<MentorDocument[]> {
    return this.mentorModel.find({ college });
  }

  async updateMentorAvailability(
    mentorId: string,
    updateSlotsDto: UpdateSlotsDto,
  ): Promise<MentorDocument | null> {
    const updatedMentor = await this.mentorModel.findByIdAndUpdate(
      mentorId,
      { selectedSlots: updateSlotsDto.updatedSlots },
      { new: true },
    );
    return updatedMentor;
  }

  async updateMentor(
    mentorId: string,
    updateMentorDto: UpdateMentorDto,
  ): Promise<MentorDocument | null> {
    const updatedMentor = await this.mentorModel.findByIdAndUpdate(
      mentorId,
      { $set: updateMentorDto },
      { new: true, runValidators: true },
    );
    return updatedMentor;
  }

  async getAllFutureBookings(mentorId: string, currDate: Date): Promise<Date[]> {
    const allFutureBookings = await this.bookingModel.find({
      mentor: mentorId,
      slot: { $gt: currDate },
    });

    // Return only the slot dates
    return allFutureBookings.map((booking) => moment(booking.slot).toDate());
  }

  /**
   * Fetch mentor profile along with available slots for next 7 days
   * This is the complex slot calculation logic from the original backend
   */
  async fetchMentorProfile(mentorId: string): Promise<any> {
    const mentor = await this.mentorModel.findById(mentorId).lean();

    if (!mentor) {
      throw new NotFoundException('Mentor not found');
    }

    // Check if mentor has available slots
    let availableDays = 0;
    const selectedSlots = Object.values(mentor.selectedSlots || {});

    for (const slot of selectedSlots) {
      if (Array.isArray(slot) && slot.length > 0) {
        availableDays++;
      }
    }

    // No slots available in week
    if (availableDays === 0) {
      return {
        ...mentor,
        isAvailable: false,
        slots: null,
      };
    }

    // Start iterating from current day to find next 7 available days
    const currDate = moment();
    const currWeekDay = currDate.weekday();

    // Get all future bookings to remove booked slots from available slots
    const bookedSlots = await this.getAllFutureBookings(
      mentorId,
      currDate.toDate(),
    );

    const availableSlots: { date: string; slots: Date[] }[] = [];
    availableDays = 0;

    // Until we find 7 available slot dates, keep iterating
    for (let offsetDays = 0; availableDays < 7; offsetDays++) {
      const weekday = (currWeekDay + offsetDays) % 7;
      const slotsForDay = mentor.selectedSlots?.[weekday as keyof typeof mentor.selectedSlots];

      if (Array.isArray(slotsForDay) && slotsForDay.length > 0) {
        // Get date on this day which is offsetDays ahead from currDate
        const date = moment(currDate).add(offsetDays, 'days');

        // AllSlotsOnDay are mentor available slots including booked ones
        const allSlotsOnDay = slotsForDay;

        // Find slots which are not booked
        const availableSlotsOnDay: Date[] = [];

        allSlotsOnDay.forEach((slot: Date) => {
          const slotDate = new Date(slot);
          // For the date, match time with all slots to check if there is a booking
          const slotOnDate = moment(date)
            .set({
              hour: slotDate.getHours(),
              minute: slotDate.getMinutes(),
              second: slotDate.getSeconds(),
              millisecond: 0,
            })
            .toDate();

          // Check if this slot is not already booked
          const isBooked = bookedSlots.some(
            (bookedDate) => bookedDate.getTime() === slotOnDate.getTime(),
          );

          if (!isBooked) {
            availableSlotsOnDay.push(slotOnDate);
          }
        });

        if (availableSlotsOnDay.length > 0) {
          availableSlots.push({
            date: date.format('YYYY-MM-DD'),
            slots: availableSlotsOnDay,
          });
          availableDays++;
        }
      }
    }

    return {
      ...mentor,
      isAvailable: true,
      slots: availableSlots,
    };
  }
}
