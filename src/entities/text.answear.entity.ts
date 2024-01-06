import { Field, ObjectType } from "@nestjs/graphql";
import { Entity, ManyToOne, JoinColumn } from "typeorm";
import { AbstractContentEntity } from "./abstract.content.entity";
import { Question } from "./question.entity";

@Entity('Text_answears')
@ObjectType()
export class TextAnswear extends AbstractContentEntity {

    @ManyToOne(() => Question, question => question.text_answears)
    @JoinColumn({ name: 'question_id' })
    @Field(() => Question)
    question: Question;
}