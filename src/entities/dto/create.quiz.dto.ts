import { Field, InputType, Int } from "@nestjs/graphql";
import { CreateQuestionDto } from "./create.question.dto";

@InputType()
export class CreateQuizDto {

    @Field(() => Int)
    readonly user_id: number;

    @Field()
    readonly name: string;

    @Field(() => [CreateQuestionDto])
    readonly questions: CreateQuestionDto[];
}