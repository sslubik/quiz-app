import { Column, Entity } from "typeorm";
import { AbstractEntity } from "./abstract.entity";
import { Field, ObjectType } from "@nestjs/graphql";

@Entity()
@ObjectType()
export class AbstractTextContentEntity extends AbstractEntity<AbstractTextContentEntity> {

    @Column({ type: 'text' })
    @Field()
    content: string;
}