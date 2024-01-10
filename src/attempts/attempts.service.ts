import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { normilizeString } from 'src/auxillery-functions/normilizeString';
import { Attempt } from 'src/entities/attempt.entity';
import { AttemptQuestion } from 'src/entities/attempt.question.entity';
import { ChoiceAnswer } from 'src/entities/choice.answer.entity';
import { CreateAttemptDto } from 'src/entities/dto/create.attempt.dto';
import { UpdateAttemptDto } from 'src/entities/dto/update.attempt.dto';
import { Question, QuestionTypeEnum } from 'src/entities/question.entity';
import { SortingAnswer } from 'src/entities/sorting.answer.entity';
import { TextAnswer } from 'src/entities/text.answer.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class AttemptsService {

    constructor(
        @InjectRepository(Attempt)
        private readonly attemptsRepository: Repository<Attempt>,
        private readonly dataSource: DataSource
    ) {}

    async findAll(): Promise<Attempt[]> {
        try {
            return this.attemptsRepository.find();
        } catch(err) {
            console.error(err);
        }
    }

    async findOne(id: number): Promise<Attempt> {
        try {
            return this.attemptsRepository.findOneBy({ id });
        } catch(err) {
            console.error(err);
        }
    }

    async create(createAttemptDto: CreateAttemptDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        
        try {
            const attempt = new Attempt(createAttemptDto);
            const savedAttempt = await queryRunner.manager.save(Attempt, attempt);
            const questions = await queryRunner.manager.findBy(
                Question, 
                { quiz_id: attempt.quiz_id }
            )

            for (const question of questions) {
                const attemptQuestion = new AttemptQuestion();
                attemptQuestion.attempt = savedAttempt;
                attemptQuestion.question = question;

                await queryRunner.manager.save(AttemptQuestion, attemptQuestion);
            }
            
            await queryRunner.commitTransaction();
            return savedAttempt;
        } catch(err) {
            console.error(err);
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }
    }

    async updateAttempt(updateAttemptDto: UpdateAttemptDto): Promise<Attempt> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        
        try {
            const { attempt_id, userAnswers } = updateAttemptDto;
            const attempt = await queryRunner.manager.findOneBy(
                Attempt, 
                { id: attempt_id }
            );
            attempt.finished_at = new Date();
            const savedAttempt = await queryRunner.manager.save(
                Attempt,
                attempt
            );

            for (const userAnswer of userAnswers) {
                const { question_id,
                        num_array_answer,
                        text_answer } = userAnswer;
                // Assigned to 0 by default in case no answers were sent 
                let pointsScored = 0;
                let stringUserAnswer = '';
                
                // If received answer is not empty
                if ((Array.isArray(num_array_answer) && num_array_answer.length)
                    || (typeof text_answer === 'string'&& text_answer.length)) {  

                    const question = await queryRunner.manager.findOneBy(
                        Question, 
                        { id: question_id }
                    );

                    switch (question.question_type) {
                        case QuestionTypeEnum.CHOICE:
                            stringUserAnswer = num_array_answer.toString();
                            const choiceAnswersArr = await queryRunner.manager.findBy(
                                ChoiceAnswer,
                                { question }
                            );
                            const trueAnswersArr = choiceAnswersArr.filter(answer => answer.is_correct);

                            if (trueAnswersArr.length !== num_array_answer.length) {
                                break;
                            }

                            pointsScored = question.max_points;

                            for (const trueAnswer of trueAnswersArr) {
                                const index = num_array_answer.indexOf(trueAnswer.id);
                                if (index < 0) {
                                    pointsScored = 0;
                                    break;
                                };
                            }
                            break;

                        case QuestionTypeEnum.SORTING:
                            stringUserAnswer = num_array_answer.toString();
                            const sortingAnswersArr = await queryRunner.manager.findBy(
                                SortingAnswer,
                                { question }
                            );
                        
                            if (sortingAnswersArr.length !== num_array_answer.length) {
                                break;
                            }

                            pointsScored = question.max_points;

                            sortingAnswersArr.sort((a, b) => a.order - b.order);

                            for (let i = 0; i < sortingAnswersArr.length; i++) {
                                if (sortingAnswersArr[i].id !== num_array_answer[i]) {
                                    pointsScored = 0;
                                    break;
                                }
                            }
                            break;

                        case QuestionTypeEnum.TEXT:
                            stringUserAnswer = text_answer;
                            const textAnswersArr = await queryRunner.manager.findBy(
                                TextAnswer,
                                { question }
                            );
                            const normilizedUserAnswer = normilizeString(text_answer);

                            for (const textAnswer of textAnswersArr) {
                                if (normilizedUserAnswer === normilizeString(textAnswer.content)) {
                                    pointsScored = question.max_points;
                                    break;
                                }
                            }
                            break;

                        default:
                            throw new Error('Failed to save answer: unknow question type!');
                    }
                }
                const attemptQuestion = await queryRunner.manager.findOneBy(
                    AttemptQuestion,
                    { 
                        question_id,
                        attempt_id
                    }
                );
                attemptQuestion.answer = stringUserAnswer;
                attemptQuestion.points_scored = pointsScored;
                await queryRunner.manager.save(AttemptQuestion, attemptQuestion);
            }

            await queryRunner.commitTransaction();
            return savedAttempt;
        } catch(err) {
            console.error(err);
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }
    }
}