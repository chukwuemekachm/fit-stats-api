import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/user/user.schema';

export type GymDocument = Gym & Document;

@Schema({ timestamps: true })
export class Gym {
  @Prop()
  name: string;

  @Prop()
  address: string;

  @Prop()
  description: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  owner: User;

  @Prop()
  image_url?: string;

  @Prop({ type: MongooseSchema.Types.Date })
  createdAt: string;

  @Prop({ type: MongooseSchema.Types.Date })
  updatedAt: string;
}

export const GymSchema = SchemaFactory.createForClass(Gym);
