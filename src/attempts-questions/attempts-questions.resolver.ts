import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { AttemptsQuestionsService } from './attempts-questions.service';
import { Question } from 'src/entities/question.entity';
import { AttemptQuestion } from 'src/entities/attempt.question.entity';
import { QuestionsService } from 'src/questions/questions.service';

@Resolver(of => AttemptQuestion)
export class AttemptsQuestionsResolver {

    constructor(
        private readonly attemptsQuesitonsService: AttemptsQuestionsService,
        private readonly questionsService: QuestionsService
    ) {}

    @ResolveField('question', returns => Question)
    async findQuestionsById(@Parent() attemptQuestion: AttemptQuestion) {
        return await this.questionsService.findByQuestionId(attemptQuestion.question_id);
    }
}
