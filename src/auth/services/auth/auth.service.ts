import { RegisterDto } from 'src/auth/dto/RegisterDto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from 'src/auth/dto/LoginDto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async register({ username, email, password, confirmPassword, profiles }: RegisterDto) {

        if (password !== confirmPassword) {
            throw new BadRequestException('Password confirmation does not match password');
        }

        const user = await this.usersService.findOneByEmail(email);

        if (user) {
            throw new BadRequestException('User already exists');
        }

        await this.usersService.create({
            username,
            profiles,
            email,
            password: await bcrypt.hash(password, 10),
        });

        return {
            username,
            profiles,
            email,
        };
    }

    async login({ email, password }: LoginDto) {
        const user = await this.usersService.findByEmailWithPassword(email);
        if (!user) {
            throw new UnauthorizedException('email is wrong');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('password is wrong');
        }

        const payload = { id: user.id, email: user.email, profile: user.profiles };
        const token = await this.jwtService.signAsync(payload);

        return {
            id: user.id,
            token,
            email,
        };
    }
}
