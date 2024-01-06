import { Query, Resolver } from '@nestjs/graphql';
import { TextAnswersService } from './text-answers.service';
import { TextAnswer } from 'src/entities/text.answer.entity';

@Resolver()
export class TextAnswersResolver {

    constructor(private readonly textAnswersService: TextAnswersService) {}

    @Query(returns => [TextAnswer])
    async findAll(): Promise<TextAnswer[]> {
        return await this.textAnswersService.findAll();
    }

    @Query(returns => TextAnswer)
    async findOne(id: number): Promise<TextAnswer> {
        return await this.textAnswersService.findOne(id);
    }
}
