import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from 'src/entities/question.entity';
import { QuestionsService } from './questions.service';

@Module({
    imports: [TypeOrmModule.forFeature([Question])],
    providers: [QuestionsService],
    exports: [QuestionsService]
})
export class QuestionsModule {}
