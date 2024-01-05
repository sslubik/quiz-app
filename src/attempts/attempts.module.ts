import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attempt } from 'src/entities/attempt.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Attempt])],
    providers: []
})
export class AttemptsModule {}
