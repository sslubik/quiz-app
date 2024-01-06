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
        try { 
          return this.usersRepository.find(); 
        } catch(err) { 
          console.error(err); 
        }
    }

    async findOne(id: number) {
        try {
          return this.usersRepository.findOneBy({ id }); 
        } catch(err) {
          console.error(err);
        }
    }

    async create(createUserDto: CreateUserDto) {
        try {
          const user = new User(createUserDto);
          return this.usersRepository.save(user);
        } catch(err) {
          console.error(err);
        }
    }

    async remove(id: number) {
        try { 
          this.usersRepository.delete(id); 
        } catch(err) { 
          console.error(err);
        }
    }
}
