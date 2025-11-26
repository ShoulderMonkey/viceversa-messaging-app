import { Injectable } from '@nestjs/common';
import { InMemoryRepository } from '../shared/in-memory.repository';
import { User } from '../models/user.entity';
import { UserFilter } from './user.filter';

@Injectable()
export class UserService extends InMemoryRepository<User, UserFilter>{
    
    constructor() {
        super();
    }

    findByUsername(username: string){
        const filter = new UserFilter({username})
        return this.findMany(filter).data[0]
    }
}
