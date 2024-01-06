import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { AbstractContentEntity } from "./abstract.content.entity";
import { Question } from "./question.entity";

@Entity('Choice_answers')
@ObjectType()
export class ChoiceAnswer extends AbstractContentEntity {

    @Column()
    @Field()
    is_correct: boolean;

    @ManyToOne(() => Question, question => question.choice_answers)
    @JoinColumn({ name: 'question_id' })
    @Field(() => Question)
    question: Question;
}