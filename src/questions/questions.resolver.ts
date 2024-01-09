import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Question } from 'src/entities/question.entity';
import { QuestionsService } from './questions.service';
import { AnswersUnion } from 'src/entities/GraphQL unions/answers.union';

@Resolver(of => Question)
export class QuestionsResolver {

    constructor(
        private readonly questionsService: QuestionsService
    ) {}

    @ResolveField('answers', returns => [AnswersUnion])
    async findAnswers(@Parent() question: Question) {
        return await this.questionsService.findAnswers(question);
    }
}
