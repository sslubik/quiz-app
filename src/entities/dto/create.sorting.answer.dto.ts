import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class CreateSortingAnswerDto {

    @Field()
    content: string;

    @Field(() => Int)
    order: number;
}