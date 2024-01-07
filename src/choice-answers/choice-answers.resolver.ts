import { Query, Resolver } from '@nestjs/graphql';
import { ChoiceAnswersService } from './choice-answers.service';
import { ChoiceAnswer } from 'src/entities/choice.answer.entity';

@Resolver()
export class ChoiceAnswersResolver {

    constructor(private readonly choiceAnswersService: ChoiceAnswersService) {}

    @Query(returns => [ChoiceAnswer])
    async findAllChoiceAnswers(): Promise<ChoiceAnswer[]> {
        return await this.choiceAnswersService.findAll();
    }

    @Query(returns => ChoiceAnswer)
    async findOneChoiceAnswer(id: number): Promise<ChoiceAnswer> {
        return await this.choiceAnswersService.findOne(id);
    }
}
