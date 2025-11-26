import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy as CustomStrategy } from 'passport-custom';
import { AuthService } from "../auth.service";
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class UsernameStrategy extends PassportStrategy(CustomStrategy, 'username') {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(req: any): Promise<any> {
    const { username } = req.body;

    if (!username) {
      throw new UnauthorizedException('Username is required');
    }

    // Your custom lookup logic
    const user = await this.authService.validateByUsername(username);

    if (!user) {
      throw new UnauthorizedException('Invalid username');
    }

    // Whatever you return here becomes req.user
    return user;
  }
}

@Injectable()
export class UsernameAuthGuard extends AuthGuard('username') {}


