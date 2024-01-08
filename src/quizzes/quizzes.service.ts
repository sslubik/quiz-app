import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { sortingAnswerCorrectOrder } from 'src/auxillery-functions/sortingAnswerCorrectOrder';
import { ChoiceAnswer } from 'src/entities/choice.answer.entity';
import { CreateQuizDto } from 'src/entities/dto/create.quiz.dto';
import { Question, QuestionTypeEnum } from 'src/entities/question.entity';
import { Quiz } from 'src/entities/quiz.entity';
import { SortingAnswer } from 'src/entities/sorting.answer.entity';
import { TextAnswer } from 'src/entities/text.answer.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class QuizzesService {

    constructor(
        @InjectRepository(Quiz)
        private readonly quizzesRepository: Repository<Quiz>,
        private readonly dataSource: DataSource
    ) {}

    async findAll(): Promise<Quiz[]> {
        try {
          return this.quizzesRepository.find();
        } catch(err) {
          console.error(err);
        }
    }

    async findOne(id: number): Promise<Quiz> {
        try {
          return this.quizzesRepository.findOneBy({ id });
        } catch(err) {
          console.error(err);
        }
    }

    async findByUserId(user_id: number): Promise<Quiz[]> {
      try {
        return this.quizzesRepository.findBy({ user_id });
      } catch(err) {
        console.error(err);
      }
    }

    async createQuiz(createQuizDto: CreateQuizDto): Promise<Quiz> {
      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();
  
      try {
        const { questionsDto, ...newQuiz } = createQuizDto;

        const quiz = new Quiz(newQuiz);
  
        const savedQuiz = await queryRunner.manager.save(Quiz, quiz);
  
        for (const questionDto of questionsDto) {
          const { choiceAnswersDto, 
                  sortingAnswersDto, 
                  textAnswersDto, 
                  ...newQuestion } = questionDto;

          if ((typeof choiceAnswersDto === 'undefined' || !choiceAnswersDto.length)
              && (typeof sortingAnswersDto === 'undefined' || !sortingAnswersDto.length)
              && (typeof textAnswersDto === 'undefined' || !textAnswersDto.length)) {
            throw new Error(`All questions must have at least one answer!
            Faulty question content: ${newQuestion.content}`);
          }

          if (newQuestion.max_points < 0) {
            throw new Error(`Max points for question cannot be lesser than 0!
            Faulty question content: ${newQuestion.content}`);
          }

          const question = new Question(newQuestion);
          question.quiz = savedQuiz;
  
          const savedQuestion = await queryRunner.manager.save(Question, question);
  
          switch (savedQuestion.question_type) {
            case QuestionTypeEnum.CHOICE:
              const isCorrectArr: boolean[] = [];

              for (const choiceAnswerDto of choiceAnswersDto) {
                const choiceAnswer = new ChoiceAnswer(choiceAnswerDto);
                choiceAnswer.question = savedQuestion;
                isCorrectArr.push(choiceAnswer.is_correct);
  
                await queryRunner.manager.save(ChoiceAnswer, choiceAnswer);
              }

              if (!isCorrectArr.some(isCorrect => isCorrect)) {
                throw new Error(`Answers in choice type questions must have at least one true answer!
                Faulty question content: ${savedQuestion.content}`);
              }

              break;
  
            case QuestionTypeEnum.SORTING:
              const orderArr: number[] = [];

              for (const sortingAnswerDto of sortingAnswersDto) {
                const sortingAnswer = new SortingAnswer(sortingAnswerDto);
                sortingAnswer.question = question;

                if (sortingAnswer.order < 0) {
                  throw new Error(`Order in sorting answers must be greater than 0!
                  Faulty question content: ${question.content}
                  Faulty answer content: ${sortingAnswer.content}`);
                }

                orderArr.push(sortingAnswer.order);
  
                await queryRunner.manager.save(SortingAnswer, sortingAnswer);
              }

              if (!sortingAnswerCorrectOrder(orderArr)) {
                throw new Error(`Incorrect sorting order! Make sure that all answer orders are from 0 to 1, 2, 3, ...
                 Faulty Question content: ${question.content}`);
              }

              break;
  
            case QuestionTypeEnum.TEXT:
              for (const textAnswerDto of textAnswersDto) {
                const textAnswer = new TextAnswer(textAnswerDto);
                textAnswer.question = question;
  
                await queryRunner.manager.save(TextAnswer, textAnswer);
              }

              break;
  
            default:
              throw new Error('Unknown question_type in Question entity: Unable to save the answers to the datbase!');
          }
        }
  
        await queryRunner.commitTransaction();
        return savedQuiz;
      } catch (err) {
        console.error(err);
        await queryRunner.rollbackTransaction();
        throw err;
      } finally {
        await queryRunner.release();
      }
    }
}
