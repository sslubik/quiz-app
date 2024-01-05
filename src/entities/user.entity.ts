import { ObjectType, Field, registerEnumType } from '@nestjs/graphql'
import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { Quiz } from './quiz.entity';
import { Attempt } from './attempt.entity';

export enum UserRoleEnum {
    TEACHER = 'teacher',
    STUDENT = 'student'
}

registerEnumType(UserRoleEnum, { name: "UserRole"});

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
        enum: UserRoleEnum,
        enumName: 'user_role_enum'
    })
    @Field(() => UserRoleEnum)
    user_role: UserRoleEnum;

    @OneToMany(() => Quiz, quiz => quiz.user)
    @Field(() => [Quiz])
    quizzes: Quiz[];

    @OneToMany(() => Attempt, attempt => attempt.user)
    @Field(() => Attempt)
    attempts: Attempt[];
}