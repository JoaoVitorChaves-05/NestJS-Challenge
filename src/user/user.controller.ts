import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDTO } from './dtos/createUser.dto';

@Controller('user')
export class UserController {
    @Get()
    async getAllUsers(): Promise<string> {
        return JSON.stringify("Hello World!");
    }

    @Post()
    async createUser(
        @Body() createUser: CreateUserDTO
    ): Promise<string> {
        return JSON.stringify({
            message: "User created successfully!",
            user: {
                ...createUser,
                password: null,
            },
        });
    }
}
