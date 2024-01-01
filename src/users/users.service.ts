import { Injectable } from '@nestjs/common';
import { User } from './user.entity'

@Injectable()
export class UsersService {

    async findAll(): Promise<User[]> {
        const user = new User();

        user.user_id = 1;
        user.email = 'mail@mail.com';
        user.full_name = 'John Smith';
        user.password = 'qwerty';
        user.user_role = 'teacher';
        user.username = 'JSmith73';
        
        return [user];
    }
}
