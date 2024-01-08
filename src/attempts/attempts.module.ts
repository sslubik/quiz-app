import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attempt } from 'src/entities/attempt.entity';
import { AttemptsService } from './attempts.service';
import { AttemptsResolver } from './attempts.resolver';

@Module({
    imports: [TypeOrmModule.forFeature([Attempt])],
    providers: [AttemptsService, AttemptsResolver]
})
export class AttemptsModule {}
