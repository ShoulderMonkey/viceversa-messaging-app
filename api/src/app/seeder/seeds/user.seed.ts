import { User } from "../../models/user.entity";

export const USER_SEEDS: User[] = [
    {
        id: 'user-1',
        username: 'alice',
        createdAt: new Date(),
    },
    {
        id: 'user-2',
        username: 'bob',
        createdAt: new Date(),
    }
]