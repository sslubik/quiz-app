import { Test, TestingModule } from '@nestjs/testing';
import { TextAnswersResolver } from './text-answers.resolver';

describe('TextAnswersResolver', () => {
  let resolver: TextAnswersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TextAnswersResolver],
    }).compile();

    resolver = module.get<TextAnswersResolver>(TextAnswersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
