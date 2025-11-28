import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { UserModule } from '../user/user.module';
import { MessageModule } from '../message/message.module';

@Module({
  providers: [SeederService],
  imports: [
    UserModule,
    MessageModule
  ]
})
export class SeederModule {}
