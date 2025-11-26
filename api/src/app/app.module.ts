import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configuration } from '../assets/configuration';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { SeederModule } from './seeder/seeder.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        'api/src/assets/environments/.env'
      ],
      load: [configuration],
    }),
    AuthModule,
    SeederModule, 
    UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
