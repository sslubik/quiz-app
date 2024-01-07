import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { QuizzesModule } from 'src/quizzes/quizzes.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), QuizzesModule],
  providers: [UsersService, UsersResolver]
})
export class UsersModule {}
