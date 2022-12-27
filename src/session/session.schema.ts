import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Gym } from 'src/gym/gym.schema';
import { User } from 'src/user/user.schema';

export type SessionDocument = Session & Document;

@Schema({ timestamps: true })
export class Session {
  @Prop()
  notes: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Gym' })
  gym: Gym;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  trainer?: User;

  @Prop()
  date?: string;

  @Prop()
  time?: string;

  @Prop({ type: MongooseSchema.Types.Date })
  createdAt: string;

  @Prop({ type: MongooseSchema.Types.Date })
  updatedAt: string;
}

export const SessionSchema = SchemaFactory.createForClass(Session);
