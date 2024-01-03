import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create.user.dto';

@Controller('users')
export class UsersController {

    constructor(private readonly usersProvider: UsersService) {}

    @Get()
    async findAll() {
        return await this.usersProvider.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.usersProvider.findOne(+id);
    }

    @Post('signup')
    async createUser(@Body() user: CreateUserDto) {
        await this.usersProvider.create(user);
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        await this.usersProvider.remove(+id);
    }
}
