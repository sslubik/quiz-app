import { Module } from '@nestjs/common';
import { ChoiceAnswersService } from './choice-answers.service';
import { ChoiceAnswersResolver } from './choice-answers.resolver';

@Module({
  providers: [ChoiceAnswersService, ChoiceAnswersResolver]
})
export class ChoiceAnswersModule {}
