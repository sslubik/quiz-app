import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateTextAnswerDto {

    @Field()
    content: string;
}