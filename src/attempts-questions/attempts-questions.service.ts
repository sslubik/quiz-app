import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Attempt } from 'src/entities/attempt.entity';
import { AttemptQuestion } from 'src/entities/attempt.question.entity';
import { Question } from 'src/entities/question.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AttemptsQuestionsService {

    constructor(
        @InjectRepository(AttemptQuestion)
        private readonly attemptsQuestionsRepository: Repository<AttemptQuestion>,
        @InjectRepository(Question)
        private readonly questionsRepository: Repository<Question>
    ) {}

    async findByAttemptId(attempt_id: number): Promise<AttemptQuestion[]> {
        try {
            return this.attemptsQuestionsRepository.findBy({ attempt_id });
        } catch(err) {
            console.error(err);
        }
    }

    async getMaxPoints(attempt: Attempt): Promise<number> {
        try {
            const attemptQuestions = await this.attemptsQuestionsRepository.findBy(
                { attempt_id: attempt.id }
            );
            
            let max_points = 0;

            for (const attemptQuestion of attemptQuestions) {
                const question = await this.questionsRepository.findOneBy(
                    { attempts_questions: attemptQuestion }
                );
                max_points += question.max_points;
            }
 
            return max_points;
        } catch(err) {
            console.error(err);
        }
    }

    async getScore(attempt: Attempt): Promise<number> {
        try {
            const attemptQuestions = await this.attemptsQuestionsRepository.findBy(
                { attempt_id: attempt.id }
            );

            let score = 0;
            
            for (const attemptQuestion of attemptQuestions) {
                score += attemptQuestion.points_scored;
            }

            return score;
        } catch(err) {
            console.error(err);
        }
    }
}
