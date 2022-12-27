import { IsString } from 'class-validator';

export class CreateSessionDto {
  @IsString()
  notes: string;

  @IsString()
  gym: string;

  @IsString()
  user: string;

  @IsString()
  trainer: string;

  @IsString()
  date: string;

  @IsString()
  time?: string;
}
