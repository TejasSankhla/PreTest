import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

export type MentorDocument = HydratedDocument<Mentor>;

@Schema({ timestamps: true })
export class Mentor {
  @Prop({
    default:
      'https://res.cloudinary.com/dqdpzwcqp/image/upload/v1711788658/pq0ksh4pksddcskfxykh.png',
  })
  profile_pic: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, maxlength: 20 })
  name: string;

  @Prop()
  mobile_number: string;

  @Prop({ required: true })
  college: string;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  branch: string;

  @Prop({ required: true })
  grad_year: number;

  @Prop()
  rating: number;

  @Prop({ required: true })
  about: string;

  @Prop()
  tagline: string;

  @Prop({ default: 0 })
  session: number;

  @Prop({ default: null })
  linkedin_url: string;

  @Prop({ default: null })
  insta_url: string;

  @Prop({ default: false })
  isVerified: boolean;

  @Prop({ default: false })
  isBlocked: boolean;

  @Prop()
  meeting_id: string;

  @Prop({ type: [Date] })
  unavailable_dates: Date[];

  @Prop({
    type: Object,
    default: {
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
    },
  })
  selectedSlots: {
    0: Date[];
    1: Date[];
    2: Date[];
    3: Date[];
    4: Date[];
    5: Date[];
    6: Date[];
  };

  comparePassword: (password: string) => boolean;
  createToken: () => string;
}

export const MentorSchema = SchemaFactory.createForClass(Mentor);

// Pre-save hook for password hashing
MentorSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10);
    this.password = bcrypt.hashSync(this.password, saltRounds);
  }
  next();
});

// Instance method: Compare password
MentorSchema.methods.comparePassword = function (password: string): boolean {
  return bcrypt.compareSync(password, this.password);
};

// Instance method: Create JWT token
MentorSchema.methods.createToken = function (): string {
  const secret = process.env.JWT_SECRET || 'default_secret';
  const expiresIn = process.env.JWT_EXPIRY || '7d';
  const token = jwt.sign(
    {
      UserId: this._id,
      email: this.email,
      type: 'mentor',
    },
    secret,
    { expiresIn: expiresIn as jwt.SignOptions['expiresIn'] },
  );
  return token;
};
