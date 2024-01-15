import { Test, TestingModule } from '@nestjs/testing';
import { AttemptsService } from './attempts.service';
import { DataSource, Repository } from 'typeorm';
import { Attempt } from '../entities/attempt.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { deepCopy } from '../auxillery-functions/deepCopy';
import { createAttemptDtoMock } from '../entities/mocks/createAttemptDtoMock';
import { Question } from '../entities/question.entity';
import { updateAttemptDtoMock } from '../entities/mocks/updateAttemptDtoMock';
import { ChoiceAnswer } from '../entities/choice.answer.entity';
import { SortingAnswer } from '../entities/sorting.answer.entity';
import { TextAnswer } from '../entities/text.answer.entity';
import { choiceQuestionMock } from '../entities/mocks/choiceQuestionMock';
import { sortingQuestionMock } from '../entities/mocks/sortingQuestionMock';
import { textQuestionMock } from '../entities/mocks/textQuestionMock';
import { AttemptQuestion } from '../entities/attempt.question.entity';
import { attemptQuestionMock } from '../entities/mocks/attemptQuestionMock';

describe('AttemptsService', () => {
  let service: AttemptsService;
  let attemptsRepository: Repository<Attempt>;
  let dataSource: DataSource;
  let attemptQuestionMockCopy: Partial<AttemptQuestion>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AttemptsService,
        {
          provide: getRepositoryToken(Attempt),
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
                findBy: jest.fn((EntityTarget, FindOptionsWhere) => {
                  switch (EntityTarget) {
                    case Question:
                      return [
                        deepCopy(choiceQuestionMock),
                        deepCopy(sortingQuestionMock),
                        deepCopy(textQuestionMock)
                      ]
                      break;

                    case ChoiceAnswer:
                      return [
                        {
                          id: 1,
                          is_correct: true
                        },
                        {
                          id: 2,
                          is_correct: false
                        },
                        {
                          id: 3,
                          is_correct: true
                        }
                      ]
                      break;

                    case SortingAnswer:
                      return [
                        {
                          id: 1,
                          order: 3
                        },
                        {
                          id: 2,
                          order: 1
                        },
                        {
                          id: 3,
                          order: 2
                        }
                      ]
                      break;

                    case TextAnswer:
                      return [
                        {
                          id: 1,
                          content: "Mock answer."
                        }
                      ]
                      break;
                  }
                }),
                findOneBy: jest.fn((EntityTarget, FindOptionsWhere) => {
                  if (EntityTarget === Attempt) {
                    return {
                      id: FindOptionsWhere.id,
                      opens_at: new Date(),
                      time_limit: "30 minutes",
                      user_id: 1,
                      quiz_id: 1,
                    }
                  }

                  if (EntityTarget === Question) {
                    switch (FindOptionsWhere.id) {
                      case 1:
                        return deepCopy(choiceQuestionMock);
                        break;
                      
                      case 2:
                        return deepCopy(sortingQuestionMock);
                        break;

                      case 3:
                        return deepCopy(textQuestionMock);
                        break;
                    }
                  }

                  if (EntityTarget === AttemptQuestion) {
                    return attemptQuestionMockCopy;
                  }
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

    service = module.get<AttemptsService>(AttemptsService);
    attemptsRepository = module.get<Repository<Attempt>>(getRepositoryToken(Attempt));
    dataSource = module.get<DataSource>(DataSource);
    attemptQuestionMockCopy = deepCopy(attemptQuestionMock);
  });

  describe('createAttempt', () => {

    it('should create an attempt', async () => {
        const attempt = await service.create(createAttemptDtoMock);
        expect(attempt).toBeInstanceOf(Attempt);
    });

    it('should throw an error about incorrect ID format', async () => {
      const createAttemptDtoMockCopy = deepCopy(createAttemptDtoMock);
      createAttemptDtoMockCopy.user_id = -1;

      try {
        await service.create(createAttemptDtoMockCopy);
        fail('No error was thrown!');
      } catch(err) {
        expect(err.message)
          .toContain('Wrong data format: quiz_id and user_id must be integers greater than 0');
      }
    });

    it('should throw an error about incorrect ID format', async () => {
      const createAttemptDtoMockCopy = deepCopy(createAttemptDtoMock);
      createAttemptDtoMockCopy.user_id = 2.5;

      try {
        await service.create(createAttemptDtoMockCopy);
        fail('No error was thrown!');
      } catch(err) {
        expect(err.message)
          .toContain('Wrong data format: quiz_id and user_id must be integers greater than 0');
      }
    });
  });

  describe('updateAttempt', () => {

    it('should return updated attempt', async () => {
      const updateAttemptDtoMockCopy = deepCopy(updateAttemptDtoMock);
      const updatedAttempt = await service.updateAttempt(updateAttemptDtoMockCopy);
      expect(updatedAttempt).toBeInstanceOf(Attempt);
    });

    it('should make points_scored equal to 0 (no answer/wrong data types provided)', async () => {
      const updateAttemptDtoMockCopy = deepCopy(updateAttemptDtoMock);
      updateAttemptDtoMockCopy.userAnswers = [updateAttemptDtoMockCopy.userAnswers[0]];
      updateAttemptDtoMockCopy.userAnswers[0].num_array_answer = [];
      updateAttemptDtoMockCopy.userAnswers[0].num_array_answer = "";

      await service.updateAttempt(updateAttemptDtoMockCopy);

      expect(attemptQuestionMockCopy.points_scored).toBe(0);
    });

    it('should make points_scored equal to 0 (wrong answer for choice question)', async () => {
      const updateAttemptDtoMockCopy = deepCopy(updateAttemptDtoMock);
      updateAttemptDtoMockCopy.userAnswers = [updateAttemptDtoMockCopy.userAnswers[0]];
      updateAttemptDtoMockCopy.userAnswers[0].num_array_answer.push(2);

      await service.updateAttempt(updateAttemptDtoMockCopy);

      expect(attemptQuestionMockCopy.points_scored).toBe(0);
    });

    it('should make points_scored equal to 0 (wrong answer for choice question)', async () => {
      const updateAttemptDtoMockCopy = deepCopy(updateAttemptDtoMock);
      updateAttemptDtoMockCopy.userAnswers = [updateAttemptDtoMockCopy.userAnswers[0]];
      updateAttemptDtoMockCopy.userAnswers[0].num_array_answer[0] = 2;

      await service.updateAttempt(updateAttemptDtoMockCopy);

      expect(attemptQuestionMockCopy.points_scored).toBe(0);
    });

    it(`should make points_scored equal to ${choiceQuestionMock.max_points}`
    + ` (correct answer for choice question)`, async () => {
      const updateAttemptDtoMockCopy = deepCopy(updateAttemptDtoMock);
      updateAttemptDtoMockCopy.userAnswers = [updateAttemptDtoMockCopy.userAnswers[0]];

      await service.updateAttempt(updateAttemptDtoMockCopy);

      expect(attemptQuestionMockCopy.points_scored).toBe(choiceQuestionMock.max_points);
    });

    it('should make points_scored equal to 0 (wrong answer for sorting question)', async () => {
      const updateAttemptDtoMockCopy = deepCopy(updateAttemptDtoMock);
      updateAttemptDtoMockCopy.userAnswers = [updateAttemptDtoMockCopy.userAnswers[1]];
      updateAttemptDtoMockCopy.userAnswers[0].num_array_answer.shift();

      await service.updateAttempt(updateAttemptDtoMockCopy);

      expect(attemptQuestionMockCopy.points_scored).toBe(0);
    });

    it('should make points_scored equal to 0 (wrong answer for sorting question)', async () => {
      const updateAttemptDtoMockCopy = deepCopy(updateAttemptDtoMock);
      updateAttemptDtoMockCopy.userAnswers = [updateAttemptDtoMockCopy.userAnswers[1]];

      [
        updateAttemptDtoMockCopy.userAnswers[0].num_array_answer[0],
        updateAttemptDtoMockCopy.userAnswers[0].num_array_answer[1]
      ] = [
        updateAttemptDtoMockCopy.userAnswers[0].num_array_answer[1], 
        updateAttemptDtoMockCopy.userAnswers[0].num_array_answer[0]
      ]

      await service.updateAttempt(updateAttemptDtoMockCopy);

      expect(attemptQuestionMockCopy.points_scored).toBe(0);
    });

    it(`should make points_scored equal to ${sortingQuestionMock.max_points}`
    + ` (correct answer for sorting question)`, async () => {
      const updateAttemptDtoMockCopy = deepCopy(updateAttemptDtoMock);
      updateAttemptDtoMockCopy.userAnswers = [updateAttemptDtoMockCopy.userAnswers[1]];

      await service.updateAttempt(updateAttemptDtoMockCopy);

      expect(attemptQuestionMockCopy.points_scored).toBe(sortingQuestionMock.max_points);
    })

    it('should make points_scored equal to 0 (wrong answer for text question)', async () => {
      const updateAttemptDtoMockCopy = deepCopy(updateAttemptDtoMock);
      updateAttemptDtoMockCopy.userAnswers = [updateAttemptDtoMockCopy.userAnswers[2]];
      updateAttemptDtoMockCopy.userAnswers[0].text_answer = "Clearly wrong answer";

    await service.updateAttempt(updateAttemptDtoMockCopy);

      expect(attemptQuestionMockCopy.points_scored).toBe(0);
    })

    it(`should make points_scored equal to ${textQuestionMock.max_points}`
    + ` (correct answer for text question)`, async () => {
      const updateAttemptDtoMockCopy = deepCopy(updateAttemptDtoMock);
      updateAttemptDtoMockCopy.userAnswers = [updateAttemptDtoMockCopy.userAnswers[1]];

      await service.updateAttempt(updateAttemptDtoMockCopy);

      expect(attemptQuestionMockCopy.points_scored).toBe(sortingQuestionMock.max_points);
    })

  });
});
