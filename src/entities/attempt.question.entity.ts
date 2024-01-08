import { Field, Float, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { AbstractEntity } from "./abstract.entity";
import { Attempt } from "./attempt.entity";
import { Question } from "./question.entity";

@Entity('Attempt_question')
@ObjectType()
export class AttemptQuestion extends AbstractEntity<AttemptQuestion> {

    @Column()
    @Field(() => Float)
    points_scored: number;

    @Column()
    @Field()
    answer: string;

    @ManyToOne(() => Attempt, attempt => attempt.attempt_questions)
    @JoinColumn({ name: 'attempt_id' })
    @Field(() => Attempt)
    attempt: Attempt;

    @ManyToOne(() => Question, question => question.attempt_questions)
    @JoinColumn({ name: "question_id" })
    @Field(() => Question)
    question: Question;
}