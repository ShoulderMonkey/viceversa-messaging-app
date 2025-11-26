import { BadRequestException } from "@nestjs/common";
import { BaseEntity } from "../shared/base-entity";

export class Message extends BaseEntity {
    senderId: string;
    recipientId: string;
    body: string;

    validationFn = (entity: Message) => {
        if(!this.senderId)
            throw new BadRequestException('senderId is required');
        if(!this.recipientId)
            throw new BadRequestException('recipientId is required');
        if(!this.body)
            throw new BadRequestException('body is required');
        return this.baseValidationFn(entity)
    }

}