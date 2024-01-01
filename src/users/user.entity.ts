import { ObjectType, Field, Int } from '@nestjs/graphql'

export enum UserRole {
    Teacher = 'teacher',
    Student = 'student'
}

@ObjectType()
export class User {

    @Field(type => Int)
    user_id: number;

    @Field()
    username: string;

    @Field()
    email: string;

    @Field()
    password: string;
    
    @Field()
    user_role: string;

    @Field()
    full_name: string;
}