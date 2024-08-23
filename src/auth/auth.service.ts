import { Injectable } from '@nestjs/common';
import { LoginService } from './services/login.service';

@Injectable()
export class AuthService {
    constructor(private readonly loginService: LoginService) { };

    async login (email: string, password: string): Promise<{}>{
        const token = await this.loginService.checkingCredential(email, password);
        return token
    }
}
