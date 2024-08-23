import { Injectable, UnauthorizedException } from "@nestjs/common";
import { MatchPassword } from "./check-password.service";
import { GenerateToken } from "./token.service";
import { UserValidator } from "./user-validator.service";

interface ILoginService {
    checkingCredential(email: string, password: string): Promise<{}>;
}

@Injectable()
export class LoginService implements ILoginService {
    constructor(
        private readonly matchPassword: MatchPassword,
        private readonly userValidator: UserValidator,
        private readonly generateToken: GenerateToken,
    ) {};

    async checkingCredential(email: string, password: string): Promise<{}> {
        const user = await this.userValidator.userExists(email);
        const checkingPassword = await this.matchPassword.chekingPassword(
            password,
            user?.password
        );
        if(!checkingPassword) {
            throw new UnauthorizedException("Invalid credentials");
        };
        const token = this.generateToken.token(user.id, +user.role);
        return token
    };
};