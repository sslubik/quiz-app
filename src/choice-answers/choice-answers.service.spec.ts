import { Test, TestingModule } from '@nestjs/testing';
import { ChoiceAnswersService } from './choice-answers.service';

describe('ChoiceAnswersService', () => {
  let service: ChoiceAnswersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChoiceAnswersService],
    }).compile();

    service = module.get<ChoiceAnswersService>(ChoiceAnswersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
