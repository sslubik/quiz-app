import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class AbstractTextContentDto {

    @Field()
    readonly content: string;
}