import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Mentor } from './mentor.schema';
import { User } from './user.schema';

export type BookingDocument = HydratedDocument<Booking>;

@Schema({ timestamps: true })
export class Booking {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Mentor', required: true })
  mentor: Mentor;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  client: User;

  @Prop({ type: Date, required: true })
  slot: Date;

  @Prop()
  meeting_link: string;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
