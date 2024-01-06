import { ObjectType } from "@nestjs/graphql";
import { Entity } from "typeorm";
import { AbstractAnswearEntity } from "./abstract.answear.entity";

@Entity('text_answers')
@ObjectType()
export class TextAnswear extends AbstractAnswearEntity {}