import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

interface IpasswordHasher {
    hash(password: string, saltRounds: number): Promise<string>;
}

@Injectable()
export class BcryptPasswordHasher implements IpasswordHasher {
    async hash(password: string, saltRounds: number): Promise<string> {
        saltRounds = 10;
        return await bcrypt.hash(password, saltRounds);
    }
}