import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  providers: [MessageService],
  controllers: [MessageController],
  exports: [MessageService]
})
export class MessageModule {}
