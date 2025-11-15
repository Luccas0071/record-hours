import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';
import { User } from 'src/module/user/entities/user.entity';

export class CreateHourDto {
  @IsNotEmpty()
  @IsString()
  date: string;

  @IsNotEmpty()
  @IsNumber()
  hours_worked: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  user: User;
}
