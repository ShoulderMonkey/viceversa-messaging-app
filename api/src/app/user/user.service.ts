import { Injectable } from '@nestjs/common';
import { InMemoryRepository } from '../shared/in-memory.repository';
import { User } from '../models/user.entity';
import { UserFilter } from './user.filter';
import { PaginationOptions } from '../shared/pagination.types';

@Injectable()
export class UserService extends InMemoryRepository<User, UserFilter>{
    
    constructor() {
        super();
    }

    findByUsername(username: string){
        const filter = new UserFilter({username})
        console.log(filter);
        console.log('getAll test', this.getAll());
        
        const results = this.findMany(filter, new PaginationOptions())
        console.log(results);
        return results.data[0]
        
    }
}
