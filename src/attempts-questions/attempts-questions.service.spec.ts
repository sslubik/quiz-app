import { Test, TestingModule } from '@nestjs/testing';
import { AttemptsQuestionsService } from './attempts-questions.service';

describe('AttemptsQuestionsService', () => {
  let service: AttemptsQuestionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AttemptsQuestionsService],
    }).compile();

    service = module.get<AttemptsQuestionsService>(AttemptsQuestionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
