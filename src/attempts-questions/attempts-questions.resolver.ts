import { ResolveField, Resolver } from '@nestjs/graphql';
import { AttemptsQuestionsService } from './attempts-questions.service';
import { Question } from 'src/entities/question.entity';
import { Param } from '@nestjs/common';
import { AttemptQuestion } from 'src/entities/attempt.question.entity';
import { QuestionsService } from 'src/questions/questions.service';

@Resolver()
export class AttemptsQuestionsResolver {

    constructor(
        private readonly attemptsQuesitonsService: AttemptsQuestionsService,
        private readonly questionsService: QuestionsService
    ) {}

    @ResolveField('Questions', returns => Question)
    async findQuestionsById(@Param() attemptQuestion: AttemptQuestion) {
        return await this.questionsService.findByQuestionId(attemptQuestion.question_id);
    }
}
