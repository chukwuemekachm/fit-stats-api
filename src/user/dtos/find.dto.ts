import { IsString } from 'class-validator';

export class FindOneUserParams {
  @IsString()
  id: string;
}
