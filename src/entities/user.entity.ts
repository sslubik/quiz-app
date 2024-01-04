import { ObjectType, Field, registerEnumType } from '@nestjs/graphql'
import { Column, Entity } from 'typeorm';
import { AbstractEntity } from './abstract.entity';

export enum UserRole {
    TEACHER = 'teacher',
    STUDENT = 'student'
}

registerEnumType(UserRole, { name: "UserRole"});

@Entity('Users')
@ObjectType()
export class User extends AbstractEntity<User> {

    @Column({ unique: true })
    @Field()
    username: string;

    @Column({ unique: true })
    @Field()
    email: string;

    @Column()
    @Field()
    password: string;
    
    @Column()
    @Field()
    full_name: string;
    
    @Column({
        type: 'enum',
        enum: UserRole
    })
    @Field(() => UserRole)
    user_role: UserRole;

    constructor(user?: Partial<User>) {
        super(user);
    }
}