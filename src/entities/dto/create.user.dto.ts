import { InputType, Field } from '@nestjs/graphql';
import { UserRole } from '../user.entity'

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
    
    @Field(() => UserRole)
    readonly user_role: UserRole;
}