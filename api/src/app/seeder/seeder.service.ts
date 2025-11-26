import { Injectable, Logger } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { USER_SEEDS } from './seeds/user.seed';

@Injectable()
export class SeederService {
private logger = new Logger(SeederService.name);    
    constructor(
        private userService: UserService
    ){
        this.seed()
    }

    seed() {
        this.createUsers()
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
}
