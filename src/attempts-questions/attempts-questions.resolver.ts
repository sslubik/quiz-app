import { Resolver } from '@nestjs/graphql';
import { AttemptsQuestionsService } from './attempts-questions.service';

@Resolver()
export class AttemptsQuestionsResolver {

    constructor(
        private readonly attemptsQuesitonsService: AttemptsQuestionsService
    ) {}
}
