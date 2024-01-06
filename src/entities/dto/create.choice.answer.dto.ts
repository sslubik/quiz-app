import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateChoiceAnswerDto {

    @Field()
    content: string;

    @Field()
    is_correct: boolean;
}