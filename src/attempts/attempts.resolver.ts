import { Resolver, Query, Mutation, Args, ResolveField, Parent, Float } from '@nestjs/graphql';
import { AttemptsService } from './attempts.service';
import { Attempt } from 'src/entities/attempt.entity';
import { CreateAttemptDto } from 'src/entities/dto/create.attempt.dto';
import { AttemptQuestion } from 'src/entities/attempt.question.entity';
import { AttemptsQuestionsService } from 'src/attempts-questions/attempts-questions.service';
import { UpdateAttemptDto } from 'src/entities/dto/update.attempt.dto';

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
    
    @Query(returns => Attempt)
    async findAttemptById(@Args('ID') id: number) {
        return await this.attemptsService.findOne(id);
    }
    
    @ResolveField('attempt_questions', returns => [AttemptQuestion])
    async findAttemptQuestions(@Parent() attempt: Attempt) {
        return await this.attemptsQuestionsService.findByAttemptId(attempt.id);
    }

    @ResolveField('max_points', returns => Float)
    async getMaxPoints(@Parent() attempt: Attempt) {
        return await this.attemptsQuestionsService.getMaxPoints(attempt);
    }

    @ResolveField('score', returns => Float, { nullable: true })
    async getScore(@Parent() attempt: Attempt) {
        return await this.attemptsQuestionsService.getScore(attempt);
    }
    
    @Mutation(returns => Attempt)
    async createAttempt(@Args('crateAttemptDto') createAttemptDto: CreateAttemptDto) {
        return await this.attemptsService.create(createAttemptDto);
    }
    
    @Mutation(returns => Attempt)
    async updateAttempt(@Args('updateAttemptDto') updateAttemptDto: UpdateAttemptDto) {
        return await this.attemptsService.updateAttempt(updateAttemptDto);
    }
}
