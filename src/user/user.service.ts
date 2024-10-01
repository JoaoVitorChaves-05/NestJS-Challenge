import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dtos/createUser.dto';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserService {
    private users: User[] = [];
    async createUser(createUserDTO: CreateUserDTO) {
        return {
            ...createUserDTO,
            password: null
        };
    }
}
