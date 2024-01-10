import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { AbstractEntity } from "./abstract.entity";
import { Field, Int, ObjectType } from "@nestjs/graphql";
import { User } from "./user.entity";
import { Quiz } from "./quiz.entity";
import { AttemptQuestion } from "./attempt.question.entity";

@Entity('Attempts')
@ObjectType()
export class Attempt extends AbstractEntity<Attempt> {

    @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP'})
    @Field(() => Date, { nullable: true })
    opens_at: Date;

    @Column({ type: 'interval', nullable: true })
    @Field({ nullable: true })
    time_limit: string;
    
    @CreateDateColumn({ type: 'timestamp with time zone', nullable: true })
    @Field(() => Date, { nullable: true })
    finished_at: Date;

    @Column()
    @Field(() => Int)
    user_id: number;

    @ManyToOne(() => User, user => user.attempts)
    @JoinColumn({ name: 'user_id' })
    @Field(() => User)
    user: User;

    @Column()
    @Field(() => Int)
    quiz_id: number;

    @ManyToOne(() => Quiz, quiz => quiz.attempts)
    @JoinColumn({ name: 'quiz_id'})
    @Field(() => Quiz)
    quiz: Quiz;

    @OneToMany(() => AttemptQuestion, attemptQuestion => attemptQuestion.attempt)
    @Field(() => [AttemptQuestion])
    attempts_questions: AttemptQuestion[];
}