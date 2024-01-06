import { Field, ID, InputType } from "@nestjs/graphql";
import { CreateQuestionDto } from "./create.question.dto";

@InputType()
export class CreateQuizDto {

    @Field(() => ID)
    readonly user_id: number;

    @Field()
    readonly name: string;

    @Field(() => [CreateQuestionDto])
    readonly questions: CreateQuestionDto[];
}