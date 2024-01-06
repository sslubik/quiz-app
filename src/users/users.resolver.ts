import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from '../entities/user.entity';
import { CreateUserDto } from 'src/entities/dto/create.user.dto';

@Resolver(of => User)
export class UsersResolver {

    constructor(private readonly usersService: UsersService) {}

    @Query(retruns => [User])
    async findAllUsers(): Promise<User[]> {
        return await this.usersService.findAll();
    }

    @Query(returns => User)
    async findOneUser(@Args('id', { type: () => Int }) id: number) {
        return await this.usersService.findOne(id);
    }

    @Mutation(returns => User)
    async createUser(@Args('createUserDto') createUserDto: CreateUserDto) {
        return await this.usersService.create(createUserDto);
    }

    @Mutation(returns => User, { nullable: true })
    async removeUser(@Args('id', { type: () => Int }) id: number) {
        return await this.usersService.remove(id);
    }
}
