import { Field, Float, ID, InputType } from "@nestjs/graphql";
import { QuestionTypeEnum } from "../question.entity";
import { CreateChoiceAnswerDto } from "./create.choice.answer.dto";
import { CreateSortingAnswerDto } from "./create.sorting.answer.dto";
import { CreateTextAnswerDto } from "./create.text.answer.dto";

@InputType()
export class CreateQuestionDto {

    @Field()
    content: string;

    @Field()
    question_type: QuestionTypeEnum;

    @Field(() => Float)
    max_point: number;

    @Field(() => [CreateChoiceAnswerDto], { nullable: 'itemsAndList' })
    choiceAnswers: CreateChoiceAnswerDto[];

    @Field(() => [CreateSortingAnswerDto], { nullable: 'itemsAndList' })
    sortingAnswers: CreateSortingAnswerDto[];

    @Field(() => [CreateTextAnswerDto], { nullable: 'itemsAndList' })
    textAnswers: CreateTextAnswerDto[];
}