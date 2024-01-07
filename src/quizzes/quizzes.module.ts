import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from 'src/entities/quiz.entity';
import { QuizzesResolver } from './quizzes.resolver';
import { QuizzesService } from './quizzes.service';
import { QuestionsModule } from 'src/questions/questions.module';
import { ChoiceAnswersModule } from 'src/choice-answers/choice-answers.module';
import { SortingAnswersModule } from 'src/sorting-answers/sorting-answers.module';
import { TextAnswersModule } from 'src/text-answers/text-answers.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Quiz]), 
        QuestionsModule, 
        ChoiceAnswersModule,
        SortingAnswersModule,
        TextAnswersModule
    ],
    providers: [QuizzesResolver, QuizzesService],
    exports: [QuizzesService]
})
export class QuizzesModule {}
