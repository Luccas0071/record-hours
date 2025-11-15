import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { Role } from '../enum/role.enum';

export class CreateUserDto {
  @IsString({ message: 'O nome deve ser uma string.' })
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  name: string;

  @IsEmail({}, { message: 'O e-mail informado não é válido.' })
  @IsNotEmpty({ message: 'O e-mail é obrigatório.' })
  email: string;

  @IsString({ message: 'A senha deve ser uma string.' })
  @MinLength(8, { message: 'A senha deve ter no mínimo 8 caracteres.' })
  password: string;

  @IsEnum(Role, { message: 'O papel (role) informado é inválido.' })
  @IsNotEmpty({ message: 'O papel (role) é obrigatório.' })
  role: Role;

  @IsString()
  @IsOptional()
  currentHashedRefreshToken?: string;

  @IsOptional()
  created_at?: Date;

  @IsOptional()
  updated_at?: Date;
}
