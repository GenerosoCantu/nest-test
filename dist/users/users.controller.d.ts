import { UserDto, PermissionsDto } from './dto/user.dto';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(userDto: UserDto): Promise<User>;
    delete(id: any): Promise<User>;
    getProfile(req: any): any;
    update(permissionsDto: PermissionsDto, id: any): Promise<User>;
}
