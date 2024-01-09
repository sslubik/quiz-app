import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from 'src/entities/question.entity';
import { QuestionsService } from './questions.service';
import { QuestionsResolver } from './questions.resolver';
import { ChoiceAnswer } from 'src/entities/choice.answer.entity';
import { SortingAnswer } from 'src/entities/sorting.answer.entity';
import { TextAnswer } from 'src/entities/text.answer.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Question,
            ChoiceAnswer,
            SortingAnswer,
            TextAnswer
        ])
    ],
    providers: [QuestionsService, QuestionsResolver],
    exports: [QuestionsService]
})
export class QuestionsModule {}
