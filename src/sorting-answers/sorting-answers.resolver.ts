import { Resolver, Query } from '@nestjs/graphql';
import { SortingAnswersService } from './sorting-answers.service';
import { SortingAnswer } from 'src/entities/sorting.answer.entity';

@Resolver()
export class SortingAnswersResolver {

    constructor(private readonly sortingAnswersService: SortingAnswersService) {}

    @Query(returns => [SortingAnswer])
    async findAllSortingAnswers(): Promise<SortingAnswer[]> {
        return await this.sortingAnswersService.findAll();
    }

    @Query(returns => SortingAnswer)
    async findOneSortingAnswer(id: number) {
        return await this.sortingAnswersService.findOne(id);
    }
}
