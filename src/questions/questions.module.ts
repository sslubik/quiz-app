import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from 'src/entities/question.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Question])]
})
export class QuestionsModule {}
