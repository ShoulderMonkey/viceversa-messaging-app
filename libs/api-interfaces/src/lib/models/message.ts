import {BaseEntity} from './base-entity' 
export interface Message extends BaseEntity {
  senderId?: string;
  recipientId?: string;
  body?: string;
  validationFn?: any;
}
