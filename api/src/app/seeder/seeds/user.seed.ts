import { User } from "../../models/user.entity";

export const USER_SEEDS: User[] = [
    {
        ...new User(),
        id: 'user-1',
        username: 'alice',
        createdAt: new Date(),
    },
    {
        ...new User(),
        id: 'user-2',
        username: 'bob',
        createdAt: new Date(),
    }
]