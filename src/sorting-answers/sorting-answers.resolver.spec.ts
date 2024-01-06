import { Test, TestingModule } from '@nestjs/testing';
import { SortingAnswersResolver } from './sorting-answers.resolver';

describe('SortingAnswersResolver', () => {
  let resolver: SortingAnswersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SortingAnswersResolver],
    }).compile();

    resolver = module.get<SortingAnswersResolver>(SortingAnswersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
