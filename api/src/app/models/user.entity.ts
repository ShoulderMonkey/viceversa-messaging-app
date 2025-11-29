import { BadRequestException } from "@nestjs/common";
import { BaseEntity, baseEntityMock } from "../shared/base-entity";
import { isEmail } from "../utils/miscs";

export class User extends BaseEntity {
    username: string
    email: string;
    validationFn? = (entity: User) => {
        if (!entity.username)
            throw new BadRequestException('username is required');
        if(!entity.email)
            throw new BadRequestException('email is required')
        if(!isEmail(entity.email))
            throw new BadRequestException('email has bad format')
        return this.baseValidationFn(entity)
    }
}


export const userMock = (): User => ({
    ...new User(),
    ...baseEntityMock(),
    username: 'testusername1',
    email: 'user@email.com'
})

export const USER_MOCKS: User[] = [
    userMock(),
    {
        ...userMock(),
        username: 'testusername2',
        email: 'user2@email.com'
    }
]

export const USER_MOCKS_FAULTY: User[] = [
    {
        ...userMock(),
        username: undefined
    },
    {
        ...userMock(),
        email: undefined
    },
    {
        ...userMock(),
        email: 'wrongemail'
    }
]