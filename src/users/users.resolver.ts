import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from '../entities/user.entity';
import { CreateUserDto } from 'src/entities/dto/create.user.dto';
import { QuizzesService } from 'src/quizzes/quizzes.service';
import { Quiz } from 'src/entities/quiz.entity';

@Resolver(of => User)
export class UsersResolver {

    constructor(
        private readonly usersService: UsersService,
        private readonly quizzesService: QuizzesService
    ) {}

    @Query(retruns => [User])
    async findAllUsers(): Promise<User[]> {
        return await this.usersService.findAll();
    }

    @Query(returns => User)
    async findOneUser(@Args('id', { type: () => Int }) id: number) {
        return await this.usersService.findOne(id);
    }

    @ResolveField('quizzes', returns => [Quiz])
    async findQuizzes(@Parent() user: User) {
        return await this.quizzesService.findByUserId(user.id);
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