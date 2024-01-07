import { Module } from '@nestjs/common';
import { TextAnswersResolver } from './text-answers.resolver';
import { TextAnswersService } from './text-answers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TextAnswer } from 'src/entities/text.answer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TextAnswer])],
  providers: [TextAnswersResolver, TextAnswersService],
  exports: [TextAnswersService]
})
export class TextAnswersModule {}
