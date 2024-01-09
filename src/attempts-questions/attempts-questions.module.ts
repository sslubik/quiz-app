import { Module } from '@nestjs/common';
import { AttemptsQuestionsResolver } from './attempts-questions.resolver';
import { AttemptsQuestionsService } from './attempts-questions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttemptQuestion } from 'src/entities/attempt.question.entity';
import { QuestionsModule } from 'src/questions/questions.module';

@Module({
  imports: [TypeOrmModule.forFeature([AttemptQuestion]), QuestionsModule],
  providers: [AttemptsQuestionsResolver, AttemptsQuestionsService],
  exports: [AttemptsQuestionsService]
})
export class AttemptsQuestionsModule {}
