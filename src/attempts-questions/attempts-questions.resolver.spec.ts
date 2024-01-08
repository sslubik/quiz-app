import { Test, TestingModule } from '@nestjs/testing';
import { AttemptsQuestionsResolver } from './attempts-questions.resolver';

describe('AttemptsQuestionsResolver', () => {
  let resolver: AttemptsQuestionsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AttemptsQuestionsResolver],
    }).compile();

    resolver = module.get<AttemptsQuestionsResolver>(AttemptsQuestionsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
