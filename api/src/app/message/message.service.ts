import { Injectable } from '@nestjs/common';
import { InMemoryRepository } from '../shared/in-memory.repository';
import { Message } from '../models/message.entity';
import { MessageFilter } from './message.filter';

@Injectable()
export class MessageService extends InMemoryRepository<Message, MessageFilter> {
    constructor() {
        super(Message);
    }
}
