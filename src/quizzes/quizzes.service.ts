import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChoiceAnswer } from 'src/entities/choice.answer.entity';
import { CreateQuizDto } from 'src/entities/dto/create.quiz.dto';
import { Question, QuestionTypeEnum } from 'src/entities/question.entity';
import { Quiz } from 'src/entities/quiz.entity';
import { SortingAnswer } from 'src/entities/sorting.answer.entity';
import { TextAnswer } from 'src/entities/text.answer.entity';
import { Repository} from 'typeorm';

@Injectable()
export class QuizzesService {

    constructor(
        @InjectRepository(Quiz)
        private readonly quizzesRepository: Repository<Quiz>,
        @InjectRepository(Question)
        private readonly questionRepository: Repository<Question>,
        @InjectRepository(ChoiceAnswer)
        private readonly choiceAnswersRepository: Repository<ChoiceAnswer>,
        @InjectRepository(SortingAnswer)
        private readonly sortingAnswersRepository: Repository<SortingAnswer>,
        @InjectRepository(TextAnswer)
        private readonly textAnswersRepository: Repository<TextAnswer>
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
      try {
        return await this.quizzesRepository.manager.transaction(async quizManager => {
          const { questionsDto, ...newQuiz } = createQuizDto;
          const quiz = new Quiz(newQuiz);

          const savedQuiz = await this.quizzesRepository.save(quiz);

          for (const questionDto of questionsDto) {
            const { choiceAnswersDto,
                    sortingAnswersDto, 
                    textAnswersDto, 
                    ...newQuestion } = questionDto;
            const question = new Question(newQuestion);
            question.quiz = savedQuiz;

            const savedQuestion = await this.questionRepository.save(question);
            
            switch (questionDto.question_type) {
              default:
                console.error('Unknown question_type in Question entity: Unable to save the answers to the database!');
              case QuestionTypeEnum.CLOSED_ENDED:
                for (const choiceAnswerDto of choiceAnswersDto) {
                  const choiceAnswer = new ChoiceAnswer(choiceAnswerDto);
                  choiceAnswer.question = savedQuestion;

                  this.choiceAnswersRepository.save(choiceAnswer);
                }
                break;
              case QuestionTypeEnum.SORTING:
                for (const sortingAnswerDto of sortingAnswersDto) {
                  const sortingAnswer = new SortingAnswer(sortingAnswerDto);
                  sortingAnswer.question = question;

                  this.sortingAnswersRepository.save(sortingAnswer);
                }
                break;
              case QuestionTypeEnum.OPEN_ENDED:
                for (const textAnswerDto of textAnswersDto) {
                  const textAnswer = new TextAnswer(textAnswerDto);
                  textAnswer.question = question;

                  this.textAnswersRepository.save(textAnswer);
                }
                break;
            }
          }
          return savedQuiz;
        });
      } catch (err) {
        console.error(err);
      }
    }
}
