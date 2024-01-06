import { Test, TestingModule } from '@nestjs/testing';
import { ChoiceAnswersResolver } from './choice-answers.resolver';

describe('ChoiceAnswersResolver', () => {
  let resolver: ChoiceAnswersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChoiceAnswersResolver],
    }).compile();

    resolver = module.get<ChoiceAnswersResolver>(ChoiceAnswersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
