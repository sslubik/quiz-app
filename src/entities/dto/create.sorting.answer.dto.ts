import { Field, InputType, Int } from "@nestjs/graphql";
import { AbstractTextContentDto } from "./abstract.text.content.dto";

@InputType()
export class CreateSortingAnswerDto extends AbstractTextContentDto {

    @Field(() => Int)
    order: number;
}