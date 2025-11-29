import { User } from "../../models/user.entity";

export const USER_SEEDS: User[] = [
    {
        ...new User(),
        id: 'user-1',
        username: 'alice',
        email: 'alice@email.com',
        createdAt: new Date(),
    },
    {
        ...new User(),
        id: 'user-2',
        username: 'bob',
        email: 'bob@email.com',
        createdAt: new Date(),
    }
]