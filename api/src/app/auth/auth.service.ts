import { ForbiddenException, Injectable, Logger } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';

import { ConfigService } from "@nestjs/config";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private config: ConfigService
  ) {
  }

  async validateByUsername(username: string): Promise<any> {
    const user = this.usersService.findByUsername(username);
    if (!user) {
      throw new ForbiddenException(`Email or password incorrect`);
    }

    const result = {
      ...user
    };
    return result;
  }

  async login(validatedUser: any) {
    const payload = {
      id: validatedUser.id,
      username: validatedUser.username
    };
    const access_token = this.jwtService.sign(payload, {
      expiresIn: this.config.get("auth.expiresIn")
    })
    return {
      access_token: access_token
    };
  }
}
