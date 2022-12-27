import { Controller, Get, Post, Body, Param, Put, Req } from '@nestjs/common';
import { Request } from 'express';
import { CreateGymDto } from './dtos/create.dto';
import { FindOneGymParams } from './dtos/find.dto';
import { UpdateGymDto } from './dtos/update.dto';
import { GymDto } from './dtos/gym.dto';
import { GymService } from './gym.service';

@Controller('api/v1/gym')
export class GymController {
  constructor(private readonly gymService: GymService) {}

  @Get(':id')
  async get(@Param() findOneGym: FindOneGymParams) {
    const Gym = await this.gymService.getGymById(findOneGym.id);
    return new GymDto(Gym);
  }

  @Get()
  async getGyms(@Req() req: Request) {
    const Gyms = await this.gymService.getGyms({ owner: req['user']['id'] });
    return Gyms.map((Gym) => new GymDto(Gym));
  }

  @Post()
  async create(@Body() createGymDto: CreateGymDto, @Req() req: Request) {
    let gym = await this.gymService.getGym({
      name: createGymDto.name,
      owner: req['user']['id'],
    });

    if (gym) {
      return {
        statusCode: 409,
        message: `Cannot ${req.method} ${req.url}`,
        error: 'Gym already exists',
      };
    }

    gym = await this.gymService.createGym(createGymDto);

    const gymDTO = new GymDto(gym);

    return {
      gym: gymDTO,
    };
  }

  @Put(':id')
  async update(
    @Param() findOneGym: FindOneGymParams,
    @Body() updateGymDto: UpdateGymDto,
  ) {
    const gym = await this.gymService.updateGym(findOneGym.id, updateGymDto);
    return new GymDto(gym);
  }
}
