import { Field, Float, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { AbstractEntity } from "./abstract.entity";
import { Attempt } from "./attempt.entity";
import { Question } from "./question.entity";

@Entity('Attempts_questions')
@ObjectType()
export class AttemptQuestion extends AbstractEntity<AttemptQuestion> {

    @Column({ 
        nullable: true,
        type: 'double precision'
    })
    @Field(() => Float, { nullable: true })
    points_scored: number;

    @Column({ nullable: true })
    @Field({ nullable: true })
    answer: string;

    @Column()
    @Field(() => Int)
    attempt_id: number;

    @ManyToOne(() => Attempt, attempt => attempt.attempts_questions)
    @JoinColumn({ name: 'attempt_id' })
    @Field(() => Attempt)
    attempt: Attempt;

    @Column()
    @Field(() => Int)
    question_id: number;

    @ManyToOne(() => Question, question => question.attempts_questions)
    @JoinColumn({ name: "question_id" })
    @Field(() => Question)
    question: Question;
}