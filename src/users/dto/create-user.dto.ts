import { Profile } from "src/common/enums/profile.enum";


export class CreateUserDto {
    username: string;
    email: string;
    password: string;
    profiles?: string[];

}
