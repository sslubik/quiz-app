import { Test, TestingModule } from '@nestjs/testing';
import { TextAnswersService } from './text-answers.service';

describe('TextAnswersService', () => {
  let service: TextAnswersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TextAnswersService],
    }).compile();

    service = module.get<TextAnswersService>(TextAnswersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
