import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, OneToMany, ManyToOne } from "typeorm";
import { AbstractEntity } from "./abstract.entity";
import { User } from "./user.entity";

@Entity('Quizzes')
@ObjectType()
export class Quiz extends AbstractEntity<Quiz> {

    @Column()
    @Field()
    name: string;

    @Column()
    @Field()
    created_at: Date;

    @ManyToOne(() => User, user => user.quizzes)
    @Field()
    user: User;

    @OneToMany(() => Attempt, attempt => attempt.quiz)
    @Field()
    attempt: Attempt[];

    constructor(quiz: Partial<Quiz>) {
        super(quiz);
    }
}