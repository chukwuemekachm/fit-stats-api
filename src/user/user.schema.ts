import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  email: string;

  @Prop()
  googleId?: string;

  @Prop()
  outlookId?: string;

  @Prop()
  facebookId?: string;

  @Prop()
  password?: string;

  @Prop({ type: MongooseSchema.Types.Date })
  createdAt: string;

  @Prop({ type: MongooseSchema.Types.Date })
  updatedAt: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
