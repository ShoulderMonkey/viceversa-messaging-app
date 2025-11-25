import { BaseEntity } from "../shared/base-entity";

export interface Message extends BaseEntity {
    senderId: string;
    recipientId: string;
    body: string;
}