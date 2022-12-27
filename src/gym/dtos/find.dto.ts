import { IsString } from 'class-validator';

export class FindOneGymParams {
  @IsString()
  id: string;
}
