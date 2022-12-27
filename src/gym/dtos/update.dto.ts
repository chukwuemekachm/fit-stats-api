import { IsOptional, IsString } from 'class-validator';

export class UpdateGymDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsOptional()
  @IsString()
  description: string;
}
