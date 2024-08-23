import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";

interface IMatchPassword {
    chekingPassword(password: string, hashPassword: string): Promise<boolean>;
}

@Injectable()
export class MatchPassword implements IMatchPassword {
    async chekingPassword(password: string, hashPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashPassword);
    }
}