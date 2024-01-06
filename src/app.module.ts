import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { QuizzesModule } from './quizzes/quizzes.module';
import { AttemptsModule } from './attempts/attempts.module';
import { QuestionsModule } from './questions/questions.module';
import { ChoiceAnswersModule } from './choice-answers/choice-answers.module';
import { SortingAnswersModule } from './sorting-answers/sorting-answers.module';
import { TextAnswersModule } from './text-answers/text-answers.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gpl')
    }), 
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST || 'localhost',
      port: parseInt(process.env.POSTGRES_PORT) || 5432,
      username: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD || 'postgres',
      database: process.env.POSTGRES_DB || 'quiz_db',
      synchronize: JSON.parse(process.env.POSTGRES_SYNCHRONIZE) || false,
      autoLoadEntities: true
    }),
    UsersModule,
    QuizzesModule,
    AttemptsModule,
    QuestionsModule,
    ChoiceAnswersModule,
    SortingAnswersModule,
    TextAnswersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}