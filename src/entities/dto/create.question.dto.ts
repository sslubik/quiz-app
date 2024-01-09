import { Field, Float, InputType } from "@nestjs/graphql";
import { QuestionTypeEnum } from "../question.entity";
import { CreateChoiceAnswerDto } from "./create.choice.answer.dto";
import { CreateSortingAnswerDto } from "./create.sorting.answer.dto";
import { CreateTextAnswerDto } from "./create.text.answer.dto";
import { AbstractTextContentDto } from "./abstract.text.content.dto";

@InputType()
export class CreateQuestionDto extends AbstractTextContentDto {

    @Field(() => QuestionTypeEnum)
    readonly question_type: QuestionTypeEnum;

    @Field(() => Float)
    readonly max_points: number;

    @Field(() => [CreateChoiceAnswerDto], { nullable: 'itemsAndList' })
    readonly choiceAnswersDto: CreateChoiceAnswerDto[];

    @Field(() => [CreateSortingAnswerDto], { nullable: 'itemsAndList' })
    readonly sortingAnswersDto: CreateSortingAnswerDto[];

    @Field(() => [CreateTextAnswerDto], { nullable: 'itemsAndList' })
    readonly textAnswersDto: CreateTextAnswerDto[];
}