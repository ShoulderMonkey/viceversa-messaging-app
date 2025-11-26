import { Message, MESSAGE_MOCKS, MESSAGE_MOCKS_FAULTY } from '../models/message.entity';
import { BaseInMemoryRepositoryTest } from '../shared/in-memory.repository.test';
import { MessageFilter } from './message.filter';
import { MessageService } from './message.service';


class MessageServiceTest extends BaseInMemoryRepositoryTest<Message, MessageFilter> {
    getService(){
      return MessageService;
    }

    getEntity(){
      return Message;
    }

    getEntitiesMock(){
      return MESSAGE_MOCKS
    }

    getEntitiesMockFaulty(): Message[] {
      return MESSAGE_MOCKS_FAULTY
    }

    otherTests(): void {
    }

}

// Run the tests
const testInstance = new MessageServiceTest();
testInstance.runTests();

