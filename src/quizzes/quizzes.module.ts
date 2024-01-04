import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from 'src/entities/quiz.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Quiz])],
    providers: []
})
export class QuizzesModule {}
