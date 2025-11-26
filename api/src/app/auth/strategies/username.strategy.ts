import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-local';
import { AuthService } from "../auth.service";
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class UsernameStrategy extends PassportStrategy(Strategy, 'username') {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'username', // look for req.body.username
      passwordField: 'password', // will be undefined if you don't send it
    });
  }

  async validate(username: string): Promise<any> {
    console.log('trying to validate');
    
    // password arg is ignored on purpose
    const user = await this.authService.validateByUsername(username);

    if (!user) {
      throw new UnauthorizedException('Invalid username #should not give out this information. Just for demo purpose');
    }

    // whatever you return here gets attached to req.user
    return user;
  }
}

@Injectable()
export class UsernameAuthGuard extends AuthGuard('username') {}


