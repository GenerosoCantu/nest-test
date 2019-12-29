import { Model } from 'mongoose';
import { User, Permissions } from './interfaces/user.interface';
export declare class UsersService {
    private readonly userModel;
    private readonly users;
    constructor(userModel: Model<User>);
    create(user: User): Promise<User>;
    delete(id: string): Promise<User>;
    findOne(id: string): Promise<User>;
    findUser(username: string): Promise<User>;
    badLogin(id: string, login_fail: number): Promise<User>;
    updatePermissions(id: string, permissions: Permissions): Promise<User>;
}
