import { ExecutionContext, Injectable, Logger, ForbiddenException } from '@nestjs/common';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { readFileSync } from 'fs';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { join } from 'path';
import { UserService } from '../../user/user.service';
import { CryptoService } from '../crypto';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  private logger = new Logger(JwtStrategy.name);

  constructor(
    private usersService: UserService,
    private cryptoService: CryptoService,
    private config: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: readFileSync(join(__dirname, './assets/keys/public.pem')),
      algorithms: ['RS256']
    });
  }

  async validate(payload: any) {
    this.logger.debug(`Token valid for user ${payload.username}`)
      const user = this.usersService.findById(payload.id);

      if (!user) {
        throw new ForbiddenException('User not found');
      }
      
    return {
      ...user
    };
  }
}

@Injectable()
export class JWTGuard extends AuthGuard('jwt'){

  logger: Logger = new Logger(JWTGuard.name)
  constructor(private readonly reflector: Reflector){
    super()
  }

  canActivate(context: ExecutionContext) {
    const isPublicController = this.reflector.get<boolean>('isPublic', context.getClass());
    const isPublicMethod = this.reflector.get<boolean>('isPublic', context.getHandler());

    if (isPublicMethod || isPublicController) {
      return true;
    }

    return super.canActivate(context);
  }

}

