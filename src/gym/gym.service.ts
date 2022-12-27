import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Gym, GymDocument } from './gym.schema';
import { CreateGymDto } from './dtos/create.dto';
import { UpdateGymDto } from './dtos/update.dto';

@Injectable()
export class GymService {
  constructor(@InjectModel(Gym.name) private gymModel: Model<GymDocument>) {}

  async getGymById(gymId: string): Promise<GymDocument> {
    return await this.gymModel.findById(gymId);
  }

  async getGym(attributes: {
    id?: string;
    name?: string;
    owner?: string;
  }): Promise<GymDocument> {
    return await this.gymModel.findOne(attributes);
  }

  async getGyms(attributes: { owner?: string }): Promise<GymDocument[]> {
    return await this.gymModel.find(attributes);
  }

  async createGym(createGymDto: CreateGymDto): Promise<GymDocument> {
    const createdGym = new this.gymModel(createGymDto);
    return createdGym.save();
  }

  async updateGym(
    gymId: string,
    updateGymDto: UpdateGymDto,
  ): Promise<GymDocument> {
    const existingGym = await this.gymModel.findById(gymId);
    if (existingGym._id) {
      await this.gymModel.updateOne({ _id: gymId }, updateGymDto);
    }
    return await this.gymModel.findById(gymId);
  }
}
