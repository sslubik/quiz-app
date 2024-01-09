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

    async findByQuestionId(id: number): Promise<Question> {
        try {
            return this.questionsRepository.findOneBy({ id });
        } catch(err) {
            console.error(err);
        }
    }
}