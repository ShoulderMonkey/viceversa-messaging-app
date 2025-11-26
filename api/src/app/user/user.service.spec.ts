import { User, USER_MOCKS, USER_MOCKS_FAULTY } from '../models/user.entity';
import { BaseInMemoryRepositoryTest } from '../shared/in-memory.repository.test';
import { UserFilter } from './user.filter';
import { UserService } from './user.service';

class UserServiceTest extends BaseInMemoryRepositoryTest<User, UserFilter> {
    getService(){
      return UserService;
    }

    getEntity(){
      return User;
    }

    getEntitiesMock(){
      return USER_MOCKS
    }

    getEntitiesMockFaulty(): User[] {
      return USER_MOCKS_FAULTY
    }

    otherTests(): void {
    }

}

// Run the tests
const testInstance = new UserServiceTest();
testInstance.runTests();

