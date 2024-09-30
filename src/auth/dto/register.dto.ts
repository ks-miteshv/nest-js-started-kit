import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  @MaxLength(150)
  name: string;

  @IsEmail()
  @MaxLength(255)
  email: string;

  @MinLength(6)
  @MaxLength(32)
  password: string;
}
