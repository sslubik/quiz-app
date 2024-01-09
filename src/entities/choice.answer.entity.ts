import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { AbstractTextContentEntity } from "./abstract.text.content.entity";
import { Question } from "./question.entity";

@Entity('Choice_answers')
@ObjectType()
export class ChoiceAnswer extends AbstractTextContentEntity {

    @Column()
    @Field()
    is_correct: boolean;

    @ManyToOne(() => Question, question => question.choice_answers)
    @JoinColumn({ name: 'question_id' })
    @Field(() => Question)
    question: Question;
}