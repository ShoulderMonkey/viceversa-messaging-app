import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { readFileSync } from 'fs';
import { join } from 'path';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CryptoService } from './crypto';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsernameAuthGuard, UsernameStrategy } from './strategies/username.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: (config: ConfigService) => {
        return {
          privateKey: config.get('auth.keys.private'), //for quick setup, normally stored locally for dev environment
          publicKey: config.get('auth.keys.public'),
          signOptions: { algorithm: 'RS256' }
        };
      }
    })    
  ],
  controllers: [AuthController, ],
  exports: [
    AuthService,
    JwtStrategy,
    UsernameAuthGuard,
    CryptoService
  ],
  providers: [
    AuthService,
    JwtStrategy,
    UsernameStrategy,
    UsernameAuthGuard,
    CryptoService,
  ]

})
export class AuthModule {
  constructor(){
    //new Logger().debug(readFileSync(join(__dirname, '../assets/keys/private.pem')));
    
  }
}
