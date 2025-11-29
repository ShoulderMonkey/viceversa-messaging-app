import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { UserModule } from '../user/user.module';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [
    UserModule,
    EmailModule
  ],
  providers: [MessageService],
  controllers: [MessageController],
  exports: [MessageService]
})
export class MessageModule {}
