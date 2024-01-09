import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Attempt } from 'src/entities/attempt.entity';
import { AttemptQuestion } from 'src/entities/attempt.question.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AttemptsQuestionsService {

    constructor(
        @InjectRepository(AttemptQuestion)
        private readonly attemptsQuestionsRepository: Repository<AttemptQuestion>
    ) {}

    async findByAttemptId(attempt_id: number): Promise<AttemptQuestion[]> {
        try {
            return this.attemptsQuestionsRepository.findBy({ attempt_id });
        } catch(err) {
            console.error(err);
        }
    }
}
