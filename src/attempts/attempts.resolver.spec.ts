import { Test, TestingModule } from '@nestjs/testing';
import { AttemptsResolver } from './attempts.resolver';

describe('AttemptsResolver', () => {
  let resolver: AttemptsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AttemptsResolver],
    }).compile();

    resolver = module.get<AttemptsResolver>(AttemptsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
