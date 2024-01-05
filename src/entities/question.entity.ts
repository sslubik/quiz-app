import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { AbstractContentEntity } from "./abstract.content.entity";
import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";
import { Quiz } from "./quiz.entity";

export enum QuestionTypeEnum {
    OPEN_ENDED = "open_ended",
    CLOSED_ENDED = 'closed_ended',
    SORTING = 'sorting'
}

registerEnumType(QuestionTypeEnum, { name: 'QuestionTypeEnum' });

@Entity('Questions')
@ObjectType()
export class Question extends AbstractContentEntity {

    @Column()
    @Field()
    max_points: string;

    @Column({
        type: 'enum',
        enum: QuestionTypeEnum
    })
    @Field(() => QuestionTypeEnum)
    question_type = QuestionTypeEnum;
    
    @ManyToOne(() => Quiz, quiz => quiz.attempts)
    @Field(() => Quiz)
    quiz: Quiz;

    // @OneToMany(() => ChoiceAnswer, choiceAnswer => choiceAnswer.question)
    // @Field(() => ChoiceAnswer)
}