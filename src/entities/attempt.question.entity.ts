import { Field, Float, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { AbstractEntity } from "./abstract.entity";
import { Attempt } from "./attempt.entity";
import { Question } from "./question.entity";

@Entity('Attempt_question')
@ObjectType()
export class AttemptQuestion extends AbstractEntity<AttemptQuestion> {

    @Column({ nullable: true })
    @Field(() => Float, { nullable: true })
    points_scored: number;

    @Column({ nullable: true })
    @Field({ nullable: true })
    answer: string;

    @ManyToOne(() => Attempt, attempt => attempt.attempts_questions)
    @JoinColumn({ name: 'attempt_id' })
    @Field(() => Attempt)
    attempt: Attempt;

    @ManyToOne(() => Question, question => question.attempts_questions)
    @JoinColumn({ name: "question_id" })
    @Field(() => Question)
    question: Question;
}