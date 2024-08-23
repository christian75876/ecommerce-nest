import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    @UseGuards(JwtAuthGuard)
    async login(@Body() credentials: { email: string; password: string }) {
        return this.authService.login(credentials.email, credentials.password);
    }
}
