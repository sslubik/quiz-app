import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { AbstractTextContentEntity } from "./abstract.text.content.entity";
import { Field, Int, ObjectType, registerEnumType } from "@nestjs/graphql";
import { Quiz } from "./quiz.entity";
import { ChoiceAnswer } from "./choice.answer.entity";
import { SortingAnswer } from "./sorting.answer.entity";
import { TextAnswer } from "./text.answer.entity";
import { AttemptQuestion } from "./attempt.question.entity";

export enum QuestionTypeEnum {
    CHOICE = 'choice',
    TEXT = 'text',
    SORTING = 'sorting'
}

registerEnumType(QuestionTypeEnum, { name: 'QuestionTypeEnum'});

@Entity('Questions')
@ObjectType()
export class Question extends AbstractTextContentEntity {

    @Column({ type: 'double precision' })
    @Field()
    max_points: number;

    @Column({
        type: 'enum',
        enum: QuestionTypeEnum,
        enumName: 'question_type_enum'
    })
    @Field(() => QuestionTypeEnum)
    question_type: QuestionTypeEnum;

    @Column()
    @Field(() => Int)
    quiz_id: number;
    
    @ManyToOne(() => Quiz, quiz => quiz.attempts, { nullable: false })
    @JoinColumn({ name: 'quiz_id'})
    @Field(() => Quiz)
    quiz: Quiz;

    @OneToMany(() => ChoiceAnswer, choiceAnswer => choiceAnswer.question, { nullable: true })
    @Field(() => [ChoiceAnswer], { nullable: true })
    choice_answers: ChoiceAnswer[];

    @OneToMany(() => SortingAnswer, sortingAnswer => sortingAnswer.question, { nullable: true })
    @Field(() => [SortingAnswer], { nullable: true })
    sorting_answers: SortingAnswer[];

    @OneToMany(() => TextAnswer, textAnswer => textAnswer.question, { nullable: true })
    @Field(() => [TextAnswer], { nullable: true })
    text_answers: TextAnswer[];

    @OneToMany(() => AttemptQuestion, attemptQuestion => attemptQuestion.question, { nullable: true })
    @Field(() => [AttemptQuestion])
    attempts_questions: AttemptQuestion[];
}