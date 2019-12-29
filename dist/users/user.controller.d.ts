import { UserDto } from './dto/user.dto';
import { User } from './interfaces/users.interface';
export declare class UsersController {
    constructor();
    create(createItemDto: UserDto): Promise<User>;
    getProfile(req: any): any;
}
