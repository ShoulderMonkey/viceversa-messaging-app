import { Body, Controller, Logger, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsernameAuthGuard } from './strategies/username.strategy';

class Credentials {
  username: string;
}

class LoginResponse {
  access_token: string;
}



@Controller('auth')
export class AuthController {
  logger = new Logger(AuthController.name);

  constructor(
    private authService: AuthService
  ) { }

  @Post('login')
  @UseGuards(UsernameAuthGuard)
  async login(@Request() req, @Body() credentials: Credentials): Promise<LoginResponse> {
    return this.authService.login(req.user);
  }
}