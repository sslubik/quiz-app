import { Field, ObjectType } from "@nestjs/graphql";
import { AbstractContentEntity } from "./abstract.content.entity";
import { JoinColumn, ManyToOne } from "typeorm";
import { Question } from "./question.entity";

@ObjectType()
export class AbstractAnswearEntity extends AbstractContentEntity {

    @ManyToOne(() => Question, { nullable: false })
    @JoinColumn({ name: 'question_id' })
    @Field(() => Question)
    question: Question;
}