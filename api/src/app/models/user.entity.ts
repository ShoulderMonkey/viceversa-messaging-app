import { BadRequestException } from "@nestjs/common";
import { BaseEntity, baseEntityMock } from "../shared/base-entity";

export class User extends BaseEntity {
    username: string

    validationFn? = (entity: User) => {
        if (!entity.username)
            throw new BadRequestException('username is required');
        return this.baseValidationFn(entity)
    }
}


export const userMock = (): User => ({
    ...new User(),
    ...baseEntityMock(),
    username: 'testusername1'
})

export const USER_MOCKS: User[] = [
    userMock(),
    {
        ...userMock(),
        username: 'testusername2'
    }
]

export const USER_MOCKS_FAULTY: User[] = [
    {
        ...userMock(),
        username: undefined
    }
]