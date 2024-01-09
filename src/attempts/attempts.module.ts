import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attempt } from 'src/entities/attempt.entity';
import { AttemptsService } from './attempts.service';
import { AttemptsResolver } from './attempts.resolver';
import { AttemptsQuestionsModule } from 'src/attempts-questions/attempts-questions.module';

@Module({
    imports: [TypeOrmModule.forFeature([Attempt]), AttemptsQuestionsModule],
    providers: [AttemptsService, AttemptsResolver]
})
export class AttemptsModule {}
