import { IsEmail, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @MaxLength(255)
  email: string;

  @MinLength(6)
  @MaxLength(32)
  password: string;
}
