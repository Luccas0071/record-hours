import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthDto {
  @IsEmail({}, { message: 'O campo de email deve ser um email válido.' })
  email: string;

  @IsNotEmpty({ message: 'O campo de senha não pode ser vazio.' })
  password: string;
}
