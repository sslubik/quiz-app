import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class CreateAttemptDto {

    @Field(() => Int)
    readonly user_id: number;

    @Field(() => Int)
    readonly quiz_id: number;

    @Field(() => Date, { nullable: true })
    readonly opens_at: Date;

    @Field({ nullable: true })
    readonly time_limit: string;
}