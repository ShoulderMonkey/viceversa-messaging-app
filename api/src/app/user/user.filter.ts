import { User } from "../models/user.entity";
import { BaseFilter } from "../shared/base-filter";

export class UserFilter extends BaseFilter<User> {

    username?: string;
    email?:string

    matches(entity: User): boolean {
        if (!super.matches(entity)) {
            return false;
        }
        if(this.username && this.exactMatch(entity, 'username', this.username) === false) {
            return false;
        }
        if(this.email && this.exactMatch(entity, 'email', this.email) === false){
            return false;
        }

        return true
    }
}