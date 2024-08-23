import { Injectable } from "@nestjs/common";
import { IsNotEmpty, IsString } from "class-validator";

@Injectable()
export class Login {
    @IsString()
    @IsNotEmpty()
    email: string;
    
    @IsString()
    @IsNotEmpty()
    password: string;
    
}
