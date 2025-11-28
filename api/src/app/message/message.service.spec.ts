import { Message, MESSAGE_MOCKS, MESSAGE_MOCKS_FAULTY } from '../models/message.entity';
import { BaseInMemoryRepositoryTest } from '../shared/in-memory.repository.test';
import { MessageFilter } from './message.filter';
import { MessageService } from './message.service';


class MessageServiceTest extends BaseInMemoryRepositoryTest<Message, MessageFilter> {
  getService() {
    return MessageService;
  }

  getEntity() {
    return Message;
  }

  getEntitiesMock() {
    return MESSAGE_MOCKS
  }

  getEntitiesMockFaulty(): Message[] {
    return MESSAGE_MOCKS_FAULTY
  }

  otherTests(): void {
    describe('checkDuplicateMessages', () => {
      it('should throw error on duplicate', () => {
        const newMessage = this.getEntitiesMock()[0]
        //first run
        this.service.createOne(newMessage)

        const validationSpy = jest.spyOn(this.service as any, 'checkDuplicatedMessages');

        //duplicate run
        expect(() => this.service.createOne(newMessage)).toThrow()

        expect(validationSpy).toHaveBeenCalled();
        validationSpy.mockRestore();
      })

      it('should not throw error on different entities', () => {
        this.service.items = []
        const newMessage = this.getEntitiesMock()[0]
        const differentMessage = {
          ...newMessage,
          body: 'differrent body'
        }
        //first run
        this.service.createOne(newMessage)

        const validationSpy = jest.spyOn(this.service as any, 'checkDuplicatedMessages');

        //duplicate run
        console.log('different message', differentMessage);
        
        expect(this.service.createOne(differentMessage)).toBeDefined()

        expect(validationSpy).toHaveBeenCalled();
        validationSpy.mockRestore();
      })
    })
  }

}

// Run the tests
const testInstance = new MessageServiceTest();
testInstance.runTests();

