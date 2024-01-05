import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany } from "typeorm";
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
    max_points: number;

    @Column({
        type: 'enum',
        enum: QuestionTypeEnum,
        enumName: 'question_type_enum'
    })
    @Field(() => QuestionTypeEnum)
    question_type = QuestionTypeEnum;
    
    @ManyToOne(() => Quiz, quiz => quiz.attempts, { nullable: false })
    @JoinColumn({ name: 'quiz_id'})
    @Field(() => Quiz)
    quiz: Quiz;

    // @OneToMany(() => ChoiceAnswer, choiceAnswer => choiceAnswer.question)
    // @Field(() => ChoiceAnswer)
}