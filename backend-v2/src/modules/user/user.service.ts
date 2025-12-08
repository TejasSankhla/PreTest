import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../schemas/user.schema';
import { Booking, BookingDocument } from '../../schemas/booking.schema';
import { CreateUserDto, LoginUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Booking.name) private bookingModel: Model<BookingDocument>,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<{ user: UserDocument; token: string }> {
    try {
      const newUser = await this.userModel.create(createUserDto);
      const token = newUser.createToken();
      return { user: newUser, token };
    } catch (error: any) {
      if (error.code === 11000) {
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
  }

  async signIn(loginUserDto: LoginUserDto): Promise<{ user: UserDocument; token: string }> {
    const { email, password } = loginUserDto;

    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException("User doesn't exist, Please Sign-Up");
    }

    const isPasswordValid = user.comparePassword(password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Incorrect password');
    }

    const token = user.createToken();
    return { user, token };
  }

  async getUserByEmail(email: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException("User doesn't exist, Please Sign-Up");
    }
    return user;
  }

  async fetchUserBookings(userId: string): Promise<BookingDocument[]> {
    const bookings = await this.bookingModel
      .find({ client: userId })
      .populate('mentor', 'name college profile_pic branch')
      .sort({ slot: -1 });
    return bookings;
  }
}
