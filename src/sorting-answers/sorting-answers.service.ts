import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SortingAnswer } from 'src/entities/sorting.answer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SortingAnswersService {

    constructor(
        @InjectRepository(SortingAnswer)
        private readonly sortingAnswersRepository: Repository<SortingAnswer>
    ) {}

    async findAll(): Promise<SortingAnswer[]> {
        try {
            return this.sortingAnswersRepository.find();
        } catch(err) {
            console.error(err);
        }
    }

    async findOne(id: number): Promise<SortingAnswer> {
        try {
            return this.sortingAnswersRepository.findOneBy({ id })
        } catch(err) {
            console.error(err);
        }
    }
}
