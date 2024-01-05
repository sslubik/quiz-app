import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, OneToMany, ManyToOne, CreateDateColumn } from "typeorm";
import { AbstractEntity } from "./abstract.entity";
import { User } from "./user.entity";
import { Attempt } from "./attempt.entity";

@Entity('Quizzes')
@ObjectType()
export class Quiz extends AbstractEntity<Quiz> {

    @Column()
    @Field()
    name: string;

    @CreateDateColumn({ type: 'timestamp with time zone', default: 'CURRENT_TIMESTAMP'})
    @Field(() => Date, { nullable: true })
    created_at: Date;

    @ManyToOne(() => User, user => user.quizzes)
    @Field(() => User)
    user: User;

    @OneToMany(() => Attempt, attempt => attempt.quiz)
    @Field(() => [Attempt], { nullable: true })
    attempts: Attempt[];

    @OneToMany(() => Question, question => question.quiz)
    @Field(() => [Question])
    questions: Question[];

    constructor(quiz: Partial<Quiz>) {
        super(quiz);
    }
}