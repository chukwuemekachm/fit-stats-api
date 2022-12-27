import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GymController } from './gym.controller';
import { GymSchema, Gym } from './gym.schema';
import { GymService } from './gym.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Gym.name, schema: GymSchema }])],
  controllers: [GymController],
  providers: [GymService],
})
export class GymModule {}
