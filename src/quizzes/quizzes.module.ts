import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from 'src/entities/quiz.entity';
import { QuizzesResolver } from './quizzes.resolver';
import { QuizzesService } from './quizzes.service';

@Module({
    imports: [TypeOrmModule.forFeature([Quiz])],
    providers: [QuizzesResolver, QuizzesService]
})
export class QuizzesModule {}
