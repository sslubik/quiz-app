import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnswersUnion } from 'src/entities/GraphQL unions/answers.union';
import { ChoiceAnswer } from 'src/entities/choice.answer.entity';
import { Question, QuestionTypeEnum } from 'src/entities/question.entity';
import { SortingAnswer } from 'src/entities/sorting.answer.entity';
import { TextAnswer } from 'src/entities/text.answer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionsService {

    constructor(
        @InjectRepository(Question)
        private readonly questionsRepository: Repository<Question>,
        @InjectRepository(ChoiceAnswer)
        private readonly choiceAnswersRepository: Repository<ChoiceAnswer>,
        @InjectRepository(SortingAnswer)
        private readonly sortingAnswersRepository: Repository<SortingAnswer>,
        @InjectRepository(TextAnswer)
        private readonly textAnswersRepository: Repository<TextAnswer>
    ) {}

    async findByQuestionId(id: number): Promise<Question> {
        try {
            return this.questionsRepository.findOneBy({ id });
        } catch(err) {
            console.error(err);
        }
    }

    async findAnswers(question: Question): Promise<Array<typeof AnswersUnion>> {
        try {
            switch (question.question_type) {
                case QuestionTypeEnum.CHOICE:
                    return this.choiceAnswersRepository.findBy({ question });
                case QuestionTypeEnum.SORTING:
                    return this.sortingAnswersRepository.findBy({ question });
                case QuestionTypeEnum.TEXT:
                    return this.textAnswersRepository.findBy({ question });
                default:
                    throw new Error("Failed to find question answers: unknown question_type!");
            }
        } catch(err) {
            console.error(err);
        }
    }
}