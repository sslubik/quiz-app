import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Attempt } from 'src/entities/attempt.entity';
import { AttemptQuestion } from 'src/entities/attempt.question.entity';
import { CreateAttemptDto } from 'src/entities/dto/create.attempt.dto';
import { Question } from 'src/entities/question.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class AttemptsService {

    constructor(
        @InjectRepository(Attempt)
        private readonly attemptsRepository: Repository<Attempt>,
        private readonly dataSource: DataSource
    ) {}

    async findAll(): Promise<Attempt[]> {
        return this.attemptsRepository.find();
    }

    async create(createAttemptDto: CreateAttemptDto) {
        const querryRunner = this.dataSource.createQueryRunner();
        await querryRunner.connect();
        await querryRunner.startTransaction();

        try {
            const attempt = new Attempt(createAttemptDto);
            const savedAttempt = await querryRunner.manager.save(Attempt, attempt);

            const questions = await querryRunner.manager.findBy(Question, { quiz_id: attempt.quiz_id })

            for (const question of questions) {
                const attemptQuestion = new AttemptQuestion();
                attemptQuestion.attempt = savedAttempt;
                attemptQuestion.question = question;

                await querryRunner.manager.save(AttemptQuestion, attemptQuestion);
            }
            
            await querryRunner.commitTransaction();
            return savedAttempt;
        } catch(err) {
            console.error(err);
            await querryRunner.rollbackTransaction();
            throw err;
        } finally {
            await querryRunner.release();
        }
    }
}