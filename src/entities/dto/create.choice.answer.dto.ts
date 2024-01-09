import { Field, InputType } from "@nestjs/graphql";
import { AbstractTextContentDto } from "./abstract.text.content.dto";

@InputType()
export class CreateChoiceAnswerDto extends AbstractTextContentDto {

    @Field()
    is_correct: boolean;
}