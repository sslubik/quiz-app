import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from 'src/entities/question.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionsService {

    constructor(
        @InjectRepository(Question)
        private readonly questionsRepository: Repository<Question>
    ) {}
}
