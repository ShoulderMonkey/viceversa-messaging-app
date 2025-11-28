import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Message } from '../models/message.entity';
import { InMemoryRepository } from '../shared/in-memory.repository';
import { MessageFilter } from './message.filter';

@Injectable()
export class MessageService extends InMemoryRepository<Message, MessageFilter> {

    logger = new Logger(MessageService.name)

    duplicationTimespanMs = 10000

    constructor(
        //private config: ConfigService
    ) {
        super(Message);
        //this.duplicationTimespanMs = this.config.get('')
    }

    createOne(item: Message): Message {
        this.checkDuplicatedMessages(item)
        return super.createOne(item)
    }

    private checkDuplicatedMessages(message: Message) {
        const now = new Date()
        const createAtLimit = new Date()
        createAtLimit.setTime(now.getTime() - this.duplicationTimespanMs)
        const filter = new MessageFilter({ 
            createdAtFrom: createAtLimit, 
            createdAtTo: now ,
            body: message.body,
            recipientId: message.recipientId,
            senderId: message.senderId
        })
        const foundPossibleDuplicate = this.findMany(filter).data[0]
        if (foundPossibleDuplicate)
            throw new BadRequestException('Duplicate message')
    }
}
