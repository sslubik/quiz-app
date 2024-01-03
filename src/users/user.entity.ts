import { ObjectType, Field, ID } from '@nestjs/graphql'
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
    id: number;

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
    @Field()
    full_name: string;
    
    @Column()
    @Field(() => UserRole)
    user_role: UserRole;

    constructor(user: Partial<User>){
        Object.assign(this, user);
    }
}