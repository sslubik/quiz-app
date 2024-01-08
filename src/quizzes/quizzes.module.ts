import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from 'src/entities/quiz.entity';
import { QuizzesResolver } from './quizzes.resolver';
import { QuizzesService } from './quizzes.service';
import { Question } from 'src/entities/question.entity';
import { ChoiceAnswer } from 'src/entities/choice.answer.entity';
import { SortingAnswer } from 'src/entities/sorting.answer.entity';
import { TextAnswer } from 'src/entities/text.answer.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Quiz,
            Question,
            ChoiceAnswer,
            SortingAnswer,
            TextAnswer
        ]), 
    ],
    providers: [QuizzesResolver, QuizzesService],
    exports: [QuizzesService]
})
export class QuizzesModule {}
