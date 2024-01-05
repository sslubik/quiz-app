import { InputType, Field } from '@nestjs/graphql';
import { UserRoleEnum } from '../user.entity'

@InputType()
export class CreateUserDto {

    @Field()
    readonly username: string;

    @Field()
    readonly email: string;

    @Field()
    readonly password: string;
    
    @Field()
    readonly full_name: string;
    
    @Field(() => UserRoleEnum)
    readonly user_role: UserRoleEnum;
}