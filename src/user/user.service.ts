import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { CreateUserDto } from './dtos/create.dto';
import { UpdateUserDto } from './dtos/update.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getUserById(userId: string): Promise<UserDocument> {
    return await this.userModel.findById(userId);
  }

  async getUser(attributes: {
    googleId?: string;
    outlookId?: string;
    facebookId?: string;
  }): Promise<UserDocument> {
    return await this.userModel.findOne(attributes);
  }

  async getUsers(): Promise<UserDocument[]> {
    return await this.userModel.find();
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserDocument> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    const existingUser = await this.userModel.findById(userId);
    if (existingUser._id) {
      await this.userModel.updateOne({ _id: userId }, updateUserDto);
    }
    return await this.userModel.findById(userId);
  }
}
