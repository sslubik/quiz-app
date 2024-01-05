import { Column, Entity } from "typeorm";
import { AbstractEntity } from "./abstract.entity";
import { Field, ObjectType } from "@nestjs/graphql";

@Entity()
@ObjectType()
export class AbstractContentEntity extends AbstractEntity<AbstractContentEntity> {

    @Column({ type: 'text' })
    @Field()
    content: string;
}