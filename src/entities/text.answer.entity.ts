import { Field, ObjectType } from "@nestjs/graphql";
import { Entity, ManyToOne, JoinColumn } from "typeorm";
import { AbstractTextContentEntity } from "./abstract.text.content.entity";
import { Question } from "./question.entity";

@Entity('Text_answers')
@ObjectType()
export class TextAnswer extends AbstractTextContentEntity {

    @ManyToOne(() => Question, question => question.text_answers)
    @JoinColumn({ name: 'question_id' })
    @Field(() => Question)
    question: Question;
}