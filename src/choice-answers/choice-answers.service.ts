import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChoiceAnswer } from 'src/entities/choice.answer.entity';
import { CreateChoiceAnswerDto } from 'src/entities/dto/create.choice.answer.dto';
import { Question } from 'src/entities/question.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChoiceAnswersService {

    constructor(
        @InjectRepository(ChoiceAnswer)
        private readonly choiceAnswersRepository: Repository<ChoiceAnswer>
    ) {}

    async findAll(): Promise<ChoiceAnswer[]> {
        try {
            return this.choiceAnswersRepository.find();
        } catch(err) {
            console.error(err);
        }
    }

    async findOne(id: number): Promise<ChoiceAnswer> {
        try {
            return this.choiceAnswersRepository.findOneBy({ id })
        } catch(err) {
            console.error(err);
        }
    }

    // async create(createChoiceAnswersDto: CreateChoiceAnswerDto[], question: Question): Promise<ChoiceAnswer[]> {
    //     const array: ChoiceAnswer[] = [];
    //     for (const createChoiceAnswerDto of createChoiceAnswersDto) {
    //         const choiceAnswer = new ChoiceAnswer(createChoiceAnswerDto);
    //         choiceAnswer.question = question;
    //         array.push(choiceAnswer);
    //     }
    //     try {
    //         return this.choiceAnswersRepository.save(array);
    //     } catch(err) {
    //         console.error(err);
    //     }
    // }
}
