import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity } from "typeorm";
import { AbstractAnswearEntity } from "./abstract.answear.entity";

@Entity('Sorting_answers')
@ObjectType()
export class SortingAnswear extends AbstractAnswearEntity {

    @Column()
    @Field()
    order: number;
}