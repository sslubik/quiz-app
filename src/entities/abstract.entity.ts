import { PrimaryGeneratedColumn } from "typeorm";
import { ID, Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class AbstractEntity<T> {
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id: number;

    constructor(entity?: Partial<T>) {
        Object.assign(this, entity);
    }
}