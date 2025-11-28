import { Body, Controller, Logger, Post } from '@nestjs/common';
import { CurrentUser } from '../auth/decorators';
import { Message } from '../models/message.entity';
import { User } from '../models/user.entity';
import { BaseCRUDController } from '../shared/base-crud.controller';
import { UserService } from '../user/user.service';
import { MessageFilter } from './message.filter';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController extends BaseCRUDController<Message, MessageFilter>{

    logger: Logger = new Logger(MessageController.name)
    constructor(
        private readonly messageService: MessageService,
        private readonly userService: UserService

    ){
        super(messageService, MessageFilter);
    }

    @Post('add-message')
    customAddMessage(@Body() message: CustomMessageDTO, @CurrentUser()currentUser: User){
        const recipientUserId = this.userService.findByUsername(message.user).id
        const newMessage: Message = {
            ...new Message(),
            recipientId: recipientUserId,
            senderId: currentUser.id,
            body: message.message
        }

        return this.messageService.createOne(newMessage)
    }
}

export interface CustomMessageDTO {
    user: string,
    message: string
}