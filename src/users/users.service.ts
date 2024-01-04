import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity'
import { CreateUserDto } from '../entities/dto/create.user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {}
    
    async findAll() {
        return await this.usersRepository.find();
    }

    async findOne(id: number) {
        return await this.usersRepository.findOneBy({ id });
    }

    async create(createUserDto: CreateUserDto) {
        const user = new User(createUserDto);
        await this.usersRepository.save(user);
    }

    async remove(id: number) {
        await this.usersRepository.delete(id);
    }
}
