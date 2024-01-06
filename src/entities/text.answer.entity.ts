import { Field, ObjectType } from "@nestjs/graphql";
import { Entity, ManyToOne, JoinColumn } from "typeorm";
import { AbstractContentEntity } from "./abstract.content.entity";
import { Question } from "./question.entity";

@Entity('Text_answers')
@ObjectType()
export class TextAnswer extends AbstractContentEntity {

    @ManyToOne(() => Question, question => question.text_answers)
    @JoinColumn({ name: 'question_id' })
    @Field(() => Question)
    question: Question;
}