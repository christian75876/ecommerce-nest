import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user/entities";
import { Repository } from "typeorm";


interface IUserValidator {
    userExists(email: string): Promise<User | null>
}

@Injectable()
class UserValidator implements IUserValidator {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) {}

    async userExists(email: string): Promise<User | null> {
        return await this.userRepository.findOne({ where: { email } });
    }
};

export { IUserValidator, UserValidator };