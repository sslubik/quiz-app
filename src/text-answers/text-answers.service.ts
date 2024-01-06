import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { error } from 'console';
import { TextAnswer } from 'src/entities/text.answer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TextAnswersService {

    constructor(
        @InjectRepository(TextAnswer)
        private readonly textAnswersService: Repository<TextAnswer>
    ) {}

    async findAll(): Promise<TextAnswer[]> {
        try {
            return this.textAnswersService.find();
        } catch(err) {
            console.error(err);
        }
    }

    async findOne(id: number) {
        try {
            return this.textAnswersService.findOneBy({ id });
        } catch(err) {
            console.error(err);
        }
    }
}
