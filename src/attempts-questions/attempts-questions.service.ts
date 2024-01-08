import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AttemptQuestion } from 'src/entities/attempt.question.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AttemptsQuestionsService {

    constructor(
        @InjectRepository(AttemptQuestion)
        private readonly attemptsQuestionsRepository: Repository<AttemptQuestion>
    ) {}
}
