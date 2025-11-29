import { Injectable, Logger } from '@nestjs/common';
import { User } from '../models/user.entity';
import { Message } from '../models/message.entity';
import { UserService } from '../user/user.service';

export interface EmailOptions{
    message: Message
}

@Injectable()
export class EmailService {
    logger: Logger = new Logger(EmailService.name)

    constructor(
        private userService: UserService
    ){}
    sendEmail(options: EmailOptions){
        const recipientUser: User = this.userService.findById(options.message.recipientId)
        const recipientEmail = recipientUser
        //mocking email sent
        setTimeout(() => {
            this.logger.debug(`Email sent to ${recipientEmail} with message: ${options.message.body}`)
        }, 1000);
    }
}