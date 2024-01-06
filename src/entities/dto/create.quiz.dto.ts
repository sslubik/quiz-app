import { Field, InputType } from "@nestjs/graphql";
import { User } from "../user.entity";

@InputType()
export class CreateQuizDto {

    @Field()
    readonly name: string;

    @Field()
    readonly user: User;
}