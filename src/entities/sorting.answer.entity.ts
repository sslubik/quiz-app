import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, JoinColumn } from "typeorm";
import { AbstractTextContentEntity } from "./abstract.text.content.entity";
import { Question } from "./question.entity";

@Entity('Sorting_answers')
@ObjectType()
export class SortingAnswer extends AbstractTextContentEntity {

    @Column()
    @Field()
    order: number;

    @ManyToOne(() => Question, question => question.sorting_answers)
    @JoinColumn({ name: 'question_id' })
    @Field(() => Question)
    question: Question;
}