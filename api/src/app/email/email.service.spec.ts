import { Test, TestingModule } from '@nestjs/testing';
import { EmailService } from './email.service';
import { UserService } from '../user/user.service';
import { userMock } from '../models/user.entity';
import { messageMock } from '../models/message.entity';

describe('EmailService', () => {
  let service: EmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailService,
        {
          provide: UserService,
          useValue: {
            findById: jest.fn((email: string) => {
              return userMock()
            })
          }
        }
      ],
    }).compile();

    service = module.get<EmailService>(EmailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
