import { Module } from '@nestjs/common';
import { SortingAnswersResolver } from './sorting-answers.resolver';
import { SortingAnswersService } from './sorting-answers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SortingAnswer } from 'src/entities/sorting.answer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SortingAnswer])],
  providers: [SortingAnswersResolver, SortingAnswersService],
  exports: [SortingAnswersService]
})
export class SortingAnswersModule {}
