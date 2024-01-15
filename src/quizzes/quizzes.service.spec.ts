import { Test, TestingModule } from '@nestjs/testing';
import { QuizzesService } from './quizzes.service';
import { DataSource, Repository } from 'typeorm';
import { Quiz } from '../entities/quiz.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { createQuizDtoMock } from '../entities/mocks/createQuizDtoMock';
import { deepCopy } from '../auxillery-functions/deepCopy';
import { QuestionTypeEnum } from '../entities/question.entity';
import { userTeacherMock } from '../entities/mocks/userTeacherMock';
import { UserRoleEnum } from '../entities/user.entity';

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
                save: jest.fn((EntityTarget, Target) => new EntityTarget(Target)),
                findOneBy: jest.fn((EntityTarget, FindWithOptions) => {
                  const userTeacherMockCopy = deepCopy(userTeacherMock);
                  userTeacherMockCopy.id = FindWithOptions.id;

                  if (userTeacherMockCopy.id !== 1) {
                    userTeacherMockCopy.user_role = UserRoleEnum.STUDENT;
                  }

                  return userTeacherMockCopy;
                })
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
  describe('createQuiz', () => {  
    it('should create a quiz with questions and answers', async () => {
    const createQuizDtoMockCopy = deepCopy(createQuizDtoMock);
    const quiz = await service.createQuiz(createQuizDtoMockCopy);
    expect(quiz).toBeInstanceOf(Quiz);
    });

    it('should throw an error about wrong user type', async () => {
      const createQuizDtoMockCopy = deepCopy(createQuizDtoMock);
      createQuizDtoMockCopy.user_id = 2;

      try {
        await service.createQuiz(createQuizDtoMockCopy);
        fail('No error was thrown!');
      } catch(err) {
        expect(err.message).toContain('Only teachers can create new quizzes');
      }
    })

    it('should throw an error about no questions in quiz', async () => {
      const createQuizDtoMockCopy = deepCopy(createQuizDtoMock);
      createQuizDtoMockCopy.questionsDto = [];

      try {
        await service.createQuiz(createQuizDtoMockCopy);
        fail('No error was thrown!');
      } catch(err) {
        expect(err.message).toContain('Quiz must have at least one question!');
      }
    })

    it('should throw an error about empty answers', async () => {
      const createQuizDtoMockCopy = deepCopy(createQuizDtoMock);
      createQuizDtoMockCopy.questionsDto.forEach(val => {
        val.sortingAnswersDto = [];
      })

      try {
        await service.createQuiz(createQuizDtoMockCopy);
        fail('No error was thrown!');
      } catch(err) {
        expect(err.message).toContain('All questions must have at least one answer');
      }
    });

    it('should throw an error about negative max points', async () => {
      const createQuizDtoMockCopy = deepCopy(createQuizDtoMock);
      createQuizDtoMockCopy.questionsDto[1].max_points = -2;

      try {
        await service.createQuiz(createQuizDtoMockCopy);
        fail('No error was thrown!');
      } catch(err) {
        expect(err.message).toContain('Max points for question cannot be lesser than 0');
      }
    });  
    
    it('should throw an error about no true answers', async () => {
      // Setting every answer as false in the first choice question
      const createQuizDtoMockCopy = deepCopy(createQuizDtoMock);
      createQuizDtoMockCopy.questionsDto.find(element => {
        if (element.question_type === QuestionTypeEnum.CHOICE) {
          element.choiceAnswersDto.forEach(val => val.is_correct = false);
          return true;
        }
      })
    
      try {
        await service.createQuiz(createQuizDtoMockCopy);
        fail('No error was thrown!');
      } catch(err) {
        expect(err.message)
          .toContain('Answers in choice type questions must have at least one true answer');
      }
    });

    it('should throw an error about negative numbers in order', async () => {
      const createQuizDtoMockCopy = deepCopy(createQuizDtoMock);
      createQuizDtoMockCopy.questionsDto.find(element => {
        if (element.question_type === QuestionTypeEnum.SORTING) {
          element.sortingAnswersDto[0].order = -1;
          return true;
        }
      })

      try {
        await service.createQuiz(createQuizDtoMockCopy);
        fail('No error was thrown!');
      } catch(err) {
        expect(err.message).toContain('Order in sorting answers must be greater than 0');
      }
    })

    it('should throw an error about wrong increment in order', async () => {
      const createQuizDtoMockCopy = deepCopy(createQuizDtoMock);
      createQuizDtoMockCopy.questionsDto.find(element => {
        if (element.question_type === QuestionTypeEnum.SORTING) {
          element.sortingAnswersDto.sort((a, b) => b - a);
          element.sortingAnswersDto[0] += 1;
          return true;
        }
      })

      try {
        await service.createQuiz(createQuizDtoMockCopy);
        fail('No error was thrown!');
      } catch(err) {
        expect(err.message).toContain('Incorrect sorting order');
      }
    })
  });
});

