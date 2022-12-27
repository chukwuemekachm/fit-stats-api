import { IsString } from 'class-validator';

export class FindOneSessionParams {
  @IsString()
  id: string;
}
