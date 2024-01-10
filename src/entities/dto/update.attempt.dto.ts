import { Field, InputType, Int } from "@nestjs/graphql";
import { UpdateAttemptQuestionsDto } from "./update.attempt.questions.dto";

@InputType()
export class UpdateAttemptDto {

    @Field(() => Int)
    attempt_id: number;

    @Field(() => [UpdateAttemptQuestionsDto])
    userAnswers: UpdateAttemptQuestionsDto[];
}