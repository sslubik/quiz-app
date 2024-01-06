import { Test, TestingModule } from '@nestjs/testing';
import { SortingAnswersService } from './sorting-answers.service';

describe('SortingAnswersService', () => {
  let service: SortingAnswersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SortingAnswersService],
    }).compile();

    service = module.get<SortingAnswersService>(SortingAnswersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
