import { ObjectType, Field, Int, ID } from '@nestjs/graphql'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
    TEACHER = 'teacher',
    STUDENT = 'student'
}

@Entity()
@ObjectType()
export class User {

    @PrimaryGeneratedColumn()
    @Field(type => ID)
    user_id: number;

    @Column()
    @Field()
    username: string;

    @Column()
    @Field()
    email: string;

    @Column()
    @Field()
    password: string;
    
    @Column()
    @Field(() => UserRole)
    user_role: UserRole;

    @Column()
    @Field()
    full_name: string;
}