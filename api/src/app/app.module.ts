import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SeederModule } from './seeder/seeder.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [SeederModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
