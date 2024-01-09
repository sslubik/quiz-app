import { InputType } from "@nestjs/graphql";
import { AbstractTextContentDto } from "./abstract.text.content.dto";

@InputType()
export class CreateTextAnswerDto extends AbstractTextContentDto {}