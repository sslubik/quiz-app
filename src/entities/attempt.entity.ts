import { Column, CreateDateColumn, Entity, ManyToOne } from "typeorm";
import { AbstractEntity } from "./abstract.entity";
import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "./user.entity";
import { Quiz } from "./quiz.entity";

@Entity('Attempts')
@ObjectType()
export class Attempt extends AbstractEntity<Attempt> {

    @CreateDateColumn({ type: 'timestamp with time zone', default: 'CURRENT_TIMESTAMP'})
    @Field(() => Date, { nullable: true })
    opens_at: Date;

    @Column({ type: 'interval', nullable: true })
    @Field({ nullable: true })
    time_limit: string;
    
    @CreateDateColumn({ type: 'timestamp with time zone', nullable: true })
    @Field(() => Date, { nullable: true })
    finished_at: Date;

    @Column({ nullable: true })
    @Field({ nullable: true })
    score: number;

    @ManyToOne(() => User, user => user.attempts)
    @Field(() => User)
    user: User;

    @ManyToOne(() => Quiz, quiz => quiz.attempts)
    @Field(() => Quiz)
    quiz: Quiz;
}