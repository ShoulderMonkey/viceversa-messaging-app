import { Injectable, Logger } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { USER_SEEDS } from './seeds/user.seed';
import { MessageService } from '../message/message.service';
import { MESSAGE_SEEDS } from './seeds/message.seed';

@Injectable()
export class SeederService {
private logger = new Logger(SeederService.name);    
    constructor(
        private userService: UserService,
        private messageService: MessageService
    ){
        this.seed()
    }

    seed() {
        this.createUsers()
        this.createMessages()
    }

    createUsers() {
        for (const user of USER_SEEDS) {
            try {
                this.userService.findById(user.id)
            }catch(error){
                this.userService.createOne(user)
                this.logger.log(`User ${user.id} created`)
            }
        }
    }

    createMessages(){
        for (const message of MESSAGE_SEEDS) {
            try {
                this.messageService.findById(message.id)
            }catch(error){
                this.messageService.createOne(message)
                this.logger.log(`Message ${message.id} created`)
            }
        }
    }
}
