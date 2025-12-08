import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  mobile_number: string;

  @Prop({ default: false })
  isMobileVerified: boolean;

  @Prop({ default: false })
  isEmailVerified: boolean;

  comparePassword: (password: string) => boolean;
  createToken: () => string;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Pre-save hook for password hashing
UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10);
    this.password = bcrypt.hashSync(this.password, saltRounds);
  }
  next();
});

// Instance method: Compare password
UserSchema.methods.comparePassword = function (password: string): boolean {
  return bcrypt.compareSync(password, this.password);
};

// Instance method: Create JWT token
UserSchema.methods.createToken = function (): string {
  const secret = process.env.JWT_SECRET || 'default_secret';
  const expiresIn = process.env.JWT_EXPIRY || '7d';
  const token = jwt.sign(
    {
      UserId: this._id,
      email: this.email,
      type: 'user',
    },
    secret,
    { expiresIn: expiresIn as jwt.SignOptions['expiresIn'] },
  );
  return token;
};
