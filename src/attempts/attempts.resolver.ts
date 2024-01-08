import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { AttemptsService } from './attempts.service';
import { Attempt } from 'src/entities/attempt.entity';
import { CreateAttemptDto } from 'src/entities/dto/create.attempt.dto';
import { AttemptQuestion } from 'src/entities/attempt.question.entity';
import { AttemptsQuestionsService } from 'src/attempts-questions/attempts-questions.service';

@Resolver(of => Attempt)
export class AttemptsResolver {

    constructor(
        private readonly attemptsService: AttemptsService,
        private readonly attemptsQuestionsService: AttemptsQuestionsService
    ) {}

    @Query(returns => [Attempt])
    async findAllAttempts() {
        return await this.attemptsService.findAll();
    }

    @Mutation(returns => Attempt)
    async createAttempt(@Args('crateAttemptDto') createAttemptDto: CreateAttemptDto) {
        return await this.attemptsService.create(createAttemptDto);
    }

    @ResolveField('attemptQuestions', returns => [AttemptQuestion])
    async findAttemptQuestions(@Parent() attempt: Attempt) {
        return await this.attemptsQuestionsService.findByAttemptId({ attempt_id: attempt.id})
    }
}
