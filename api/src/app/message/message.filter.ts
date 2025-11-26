import { Message } from "../models/message.entity";
import { BaseFilter } from "../shared/base-filter";

export class MessageFilter extends BaseFilter<Message> {
    body?: string;
    senderId?: string;
    recipientId?: string;

    matches(entity: Message): boolean {
        if (!super.matches(entity)) {
            return false;
        }

        if(this.senderId && this.exactMatch(entity, 'senderId', this.senderId) === false){
            return false;
        }

        if(this.recipientId && this.exactMatch(entity, 'recipientId', this.recipientId) === false){
            return false;
        }

        if(this.body && this.partialMatch(entity, 'body', this.body) === false){
            return false;
        }

        return true
    }
}