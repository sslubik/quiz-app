import { Test, TestingModule } from '@nestjs/testing';
import { QuizzesService } from './quizzes.service';
import { DataSource, Repository } from 'typeorm';
import { Quiz } from '../entities/quiz.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateQuizDto } from '../entities/dto/create.quiz.dto';
import { createQuizDtoMock } from '../entities/mocks/createQuizDtoMock';
import { deepCopy } from '../auxillery-functions/deepCopy';

describe('QuizzesService', () => {
  let service: QuizzesService;
  let quizzesRepository: Repository<Quiz>;
  let dataSource: DataSource; 

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ 
        QuizzesService,
        {
          provide: getRepositoryToken(Quiz),
          useClass: Repository
        },
        {
          provide: DataSource,
          useValue: {
            createQueryRunner: jest.fn(() => ({
              connect: jest.fn(),
              startTransaction: jest.fn(),
              manager: {
                save: jest.fn((EntityTarget, Target) => new EntityTarget(Target))
              },
              commitTransaction: jest.fn(),
              rollbackTransaction: jest.fn(),
              release: jest.fn()
            }))
          }
        }
      ],
    }).compile();

    service = module.get<QuizzesService>(QuizzesService);
    quizzesRepository = module.get<Repository<Quiz>>(getRepositoryToken(Quiz));
    dataSource = module.get<DataSource>(DataSource);
  });

  it('should create a quiz with questions and answers', async () => {
    const createQuizDto = createQuizDtoMock;
    const quiz = await service.createQuiz(createQuizDto);
    expect(quiz).toBeInstanceOf(Quiz);
  });

  it('should throw an error about empty answers', async () => {
    const createQuizDtoMockCopy = deepCopy(createQuizDtoMock);
    createQuizDtoMockCopy.questionsDto.forEach(val => {
      val.choiceAnswersDto = undefined;
    })

    // const createQuizDto: CreateQuizDto = createQuizDtoMock;
    // console.log(createQuizDto.questionsDto);
    // const quiz = await service.createQuiz(createQuizDto);
    // expect(quiz).toBeUndefined();
  })
});
