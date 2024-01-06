import { ObjectType } from "@nestjs/graphql";
import { Entity } from "typeorm";
import { AbstractAnswearEntity } from "./abstract.answear.entity";

@Entity('Text_answers')
@ObjectType()
export class TextAnswear extends AbstractAnswearEntity {}