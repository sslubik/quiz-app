import { Mutation, Resolver, Args } from '@nestjs/graphql';
import { Quiz } from 'src/entities/quiz.entity';
import { QuizzesService } from './quizzes.service';
import { CreateQuizDto } from 'src/entities/dto/create.quiz.dto';

@Resolver(of => Quiz)
export class QuizzesResolver {

    constructor(private readonly quizzesService: QuizzesService) {}

    @Mutation(returns => Quiz)
    async createQuiz(@Args('createQuizDto') createQuizDto: CreateQuizDto): Promise<Quiz> {
        return await this.quizzesService.createQuiz(createQuizDto);
    }
}
