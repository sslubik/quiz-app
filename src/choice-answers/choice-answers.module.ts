import { Module } from '@nestjs/common';
import { ChoiceAnswersService } from './choice-answers.service';
import { ChoiceAnswersResolver } from './choice-answers.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChoiceAnswer } from 'src/entities/choice.answer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChoiceAnswer])],
  providers: [ChoiceAnswersService, ChoiceAnswersResolver]
})
export class ChoiceAnswersModule {}
