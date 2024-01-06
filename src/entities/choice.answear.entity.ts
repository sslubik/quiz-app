import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity } from "typeorm";
import { AbstractAnswearEntity } from "./abstract.answear.entity";

@Entity('Choice_answers')
@ObjectType()
export class ChoiceAnswear extends AbstractAnswearEntity {

    @Column()
    @Field()
    is_correct: boolean;
}