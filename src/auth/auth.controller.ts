import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto, @Res() res) {
    await this.authService.register(registerDto);
    return res.status(201).send({ message: 'User register successfully.' });
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res) {
    const response = await this.authService.login(loginDto);
    return res.status(200).send(response);
  }
}
