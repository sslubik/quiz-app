import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class UpdateAttemptQuestionsDto {

    @Field(() => Int)
    question_id: number;

    @Field(() => [Int], { nullable:true })
    num_array_answer: number[]

    @Field({ nullable: true })
    text_answer: string;
}