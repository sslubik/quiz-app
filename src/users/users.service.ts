import { Injectable } from '@nestjs/common';
import { User } from './user.entity'
import { CreateUserDto } from './dto/create.user.dto';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        private readonly entityManager: EntityManager
    ) {}
    
    async findAll() {
        return await this.usersRepository.find();
    }

    async findOne(id: number) {
        return await this.usersRepository.findOneBy({ id });
    }

    async create(createUserDto: CreateUserDto) {
        const user = new User(createUserDto);
        await this.entityManager.save(user);
    }

    async remove(id: number) {
        await this.usersRepository.delete(id);
    }
}
