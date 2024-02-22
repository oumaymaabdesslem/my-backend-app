import { Body, Controller, Get, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/auth/dto/LoginDto';
import { RegisterDto } from 'src/auth/dto/RegisterDto';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { Profile } from 'src/common/enums/profile.enum';

@Controller('auth')
export class AuthController {
    // constructor(private readonly authService: AuthService) { }
    constructor(
        private authService: AuthService,
        private jwtService: JwtService,
    ) { }

    @Post('register')
    register(
        @Body()
        registerDto: RegisterDto,
    ) {
        return this.authService.register(registerDto);
    }


    @Post('login')
    login(
        @Body()
        loginDto: LoginDto,
    ) {
        return this.authService.login(loginDto);
    }

    @Get('profiles')
    getProfiles(): string[] {
        return Object.values(Profile);
    }
}
