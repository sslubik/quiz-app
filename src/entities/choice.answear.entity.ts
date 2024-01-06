import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { AbstractContentEntity } from "./abstract.content.entity";
import { Question } from "./question.entity";

@Entity('Choice_answears')
@ObjectType()
export class ChoiceAnswear extends AbstractContentEntity {

    @Column()
    @Field()
    is_correct: boolean;

    @ManyToOne(() => Question, question => question.choice_answears)
    @JoinColumn({ name: 'question_id' })
    @Field(() => Question)
    question: Question;
}