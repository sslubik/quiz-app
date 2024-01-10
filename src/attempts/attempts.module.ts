import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attempt } from 'src/entities/attempt.entity';
import { AttemptsService } from './attempts.service';
import { AttemptsResolver } from './attempts.resolver';
import { AttemptsQuestionsModule } from 'src/attempts-questions/attempts-questions.module';
import { AttemptQuestion } from 'src/entities/attempt.question.entity';
import { Question } from 'src/entities/question.entity';
import { ChoiceAnswer } from 'src/entities/choice.answer.entity';
import { SortingAnswer } from 'src/entities/sorting.answer.entity';
import { TextAnswer } from 'src/entities/text.answer.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Attempt,
            AttemptQuestion,
            Question,
            ChoiceAnswer,
            SortingAnswer,
            TextAnswer
        ]), 
        AttemptsQuestionsModule,
    ],
    providers: [AttemptsService, AttemptsResolver]
})
export class AttemptsModule {}
