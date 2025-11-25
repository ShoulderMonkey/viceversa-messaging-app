import { Message } from "../../models/message.entity";

export const MESSAGE_SEEDS: Message[] = [
    {
        id: 'message-1',
        senderId: 'user-1',
        recipientId: 'user-2',
        body: 'Hello, Bob!',
        createdAt: new Date(),
    },
    {
        id: 'message-2',
        senderId: 'user-2',
        recipientId: 'user-1',
        body: 'Hi, Alice! How are you?',
        createdAt: new Date(),
    }
]
