import { Transform } from 'class-transformer';
import { IsArray, IsEmail, IsEnum, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';
import { Profile } from 'src/common/enums/profile.enum';


export class RegisterDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    @IsString()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least  8 characters long'
    })
    password: string;

    @IsNotEmpty()
    @IsString()
    confirmPassword: string;

    @IsArray()
    @IsEnum(Profile, { each: true })
    @IsNotEmpty()
    profiles: Profile[];
}

