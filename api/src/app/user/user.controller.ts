import { Controller, Logger, Post } from '@nestjs/common';
import { BaseCRUDController } from '../shared/base-crud.controller';
import { User } from '../models/user.entity';
import { UserFilter } from './user.filter';
import { UserService } from './user.service';
import { Public } from '../auth/decorators';

@Controller('user')
export class UserController extends BaseCRUDController<User, UserFilter>{

    logger: Logger = new Logger(UserController.name)

    constructor(
        private readonly userService: UserService
    ) {
        super(userService, UserFilter);
    }

    @Post()
    @Public()
    createOne(body: User): User {
        return super.createOne(body)
    }
}
