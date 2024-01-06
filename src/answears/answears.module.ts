import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChoiceAnswear } from 'src/entities/choice.answear.entity';
import { SortingAnswear } from 'src/entities/sorting.answear.entity';
import { TextAnswear } from 'src/entities/text.answear.entity';

@Module({
    imports: [TypeOrmModule.forFeature([TextAnswear, ChoiceAnswear, SortingAnswear])]
})
export class AnswearsModule {}
