import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CryptoService } from './crypto';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsernameAuthGuard, UsernameStrategy } from './strategies/username.strategy';
import { readFileSync } from 'fs';
import { join } from 'path';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: (config: ConfigService) => {
        return {
          privateKey: readFileSync(join(__dirname, './assets/keys/private.pem')),
          publicKey: readFileSync(join(__dirname, './assets/keys/public.pem')),
          signOptions: { algorithm: 'RS256' }
        };
      }
    })
  ],
  controllers: [AuthController],
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
