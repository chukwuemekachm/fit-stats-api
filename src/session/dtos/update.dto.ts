import { IsOptional, IsString } from 'class-validator';

export class UpdateSessionDto {
  @IsOptional()
  @IsString()
  notes: string;

  @IsOptional()
  @IsString()
  date: string;

  @IsOptional()
  @IsString()
  time?: string;
}
