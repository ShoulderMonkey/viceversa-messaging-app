import { Controller, Logger } from '@nestjs/common';
import { BaseCRUDController } from '../shared/base-crud.controller';
import { MessageFilter } from './message.filter';
import { Message } from '../models/message.entity';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController extends BaseCRUDController<Message, MessageFilter>{

    logger: Logger = new Logger(MessageController.name)
    constructor(
        private readonly messageService: MessageService
    ){
        super(messageService, MessageFilter);
    }
}
