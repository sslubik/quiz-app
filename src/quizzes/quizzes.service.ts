import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateQuizDto } from 'src/entities/dto/create.quiz.dto';
import { Quiz } from 'src/entities/quiz.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuizzesService {

    constructor(
        @InjectRepository(Quiz)
        private readonly quizzesRepository: Repository<Quiz>
    ) {}

    async findAll(): Promise<Quiz[]> {
        try {
          return this.quizzesRepository.find();
        } catch(err) {
          console.error(err);
        }
    }

    async findOne(id: number): Promise<Quiz> {
        try {
          return this.quizzesRepository.findOneBy({ id });
        } catch(err) {
          console.error(err);
        }
    }

    async findByUserId(user_id: number): Promise<Quiz[]> {
      try {
        return this.quizzesRepository.findBy({ user_id: user_id });
      } catch(err) {
        console.error(err);
      }
    }

    async createQuiz(createQuiz: CreateQuizDto) {
        const { questions, ...newQuiz } = createQuiz;
        const quiz = new Quiz(newQuiz);
    }
}
