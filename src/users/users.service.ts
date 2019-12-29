import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, Permissions } from './interfaces/user.interface'

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

  async create(user: User): Promise<User> {
    const newUser = new this.userModel(user);
    return await newUser.save();
  }

  async delete(id: string): Promise<User> {
    return await this.userModel.findByIdAndRemove(id);
  }

  async findOne(id: string): Promise<User> {
    return await this.userModel.findOne({ _id: id });
  }

  async findUser(username: string): Promise<User> {
    return await this.userModel.findOne({ username: username });
  }

  async badLogin(id: string, login_fail: number): Promise<User> {
    const fails = (login_fail) ? login_fail + 1 : 1;
    const body = (fails > 3) ? { login_fail: fails, locked: true } : { login_fail: fails };
    return await this.userModel.findByIdAndUpdate(id, body, { new: true });
  }

  async updatePermissions(id: string, permissions: Permissions): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, permissions);
  }

}