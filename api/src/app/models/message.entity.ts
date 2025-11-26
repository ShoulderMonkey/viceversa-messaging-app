import { BadRequestException } from "@nestjs/common";
import { BaseEntity, baseEntityMock } from "../shared/base-entity";

export class Message extends BaseEntity {
    senderId: string;
    recipientId: string;
    body: string;

    validationFn = (entity: Message) => {
        if(!entity.senderId)
            throw new BadRequestException('senderId is required');
        if(!entity.recipientId)
            throw new BadRequestException('recipientId is required');
        if(!entity.body)
            throw new BadRequestException('body is required');
        return this.baseValidationFn(entity)
    }
}

export const messageMock = (): Message => ({
    ...new Message(),
    ...baseEntityMock(),
    recipientId: 'test-1',
    senderId: 'test-2',
    body: 'hello!'
})

export const MESSAGE_MOCKS: Message[] = [
    messageMock(),
    {
        ...messageMock(),
        senderId: 'test-1',
        recipientId: 'test-2',
        body: "world!"
    }
]

export const MESSAGE_MOCKS_FAULTY: Message[] = [
    {
        ...messageMock(),
        senderId: undefined
    },
    {
        ...messageMock(),
        recipientId: undefined
    },
    {
        ...messageMock(),
        body: undefined
    }
]