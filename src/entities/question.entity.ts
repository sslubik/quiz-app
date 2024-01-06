import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { AbstractContentEntity } from "./abstract.content.entity";
import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";
import { Quiz } from "./quiz.entity";
import { ChoiceAnswear } from "./choice.answear.entity";
import { SortingAnswear } from "./sorting.answear.entity";
import { TextAnswear } from "./text.answear.entity";

export enum QuestionTypeEnum {
    OPEN_ENDED = "open_ended",
    CLOSED_ENDED = 'closed_ended',
    SORTING = 'sorting'
}

registerEnumType(QuestionTypeEnum, { name: 'QuestionTypeEnum' });

@Entity('Questions')
@ObjectType()
export class Question extends AbstractContentEntity {

    @Column({ type: 'double precision' })
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

    @OneToMany(() => ChoiceAnswear, choiceAnswear => choiceAnswear.question, { nullable: true })
    @Field(() => [ChoiceAnswear], { nullable: true })
    choice_answears: ChoiceAnswear[];

    @OneToMany(() => SortingAnswear, sortingAnswear => sortingAnswear.question, { nullable: true })
    @Field(() => [SortingAnswear], { nullable: true })
    sorting_answears: SortingAnswear[];

    @OneToMany(() => TextAnswear, textAnswear => textAnswear.question, { nullable: true })
    @Field(() => [TextAnswear], { nullable: true })
    text_answears: TextAnswear[];
}