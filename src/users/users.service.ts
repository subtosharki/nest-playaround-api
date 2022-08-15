import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './users.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  UpdateUserDto,
} from './users.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User')
    private readonly usersModel: Model<User>,
  ) {}
  private generateApiKey() {
    return uuid();
  }
  public async getAllUsers() {
    return await this.usersModel.find();
  }
  public async getUser(id: string) {
    if (!(await this.usersModel.findOne({ _id: id })))
      throw new NotFoundException();
    return await this.usersModel.findOne({ _id: id });
  }
  public async createUser(username: string, password: string) {
    return new this.usersModel({
      username,
      password,
      admin: false,
    }).save();
  }
  public async deleteUser(id: string) {
    const user = await this.usersModel.findOne({ _id: id });
    if (!user) throw new NotFoundException();
    return await user.remove();
  }
  public async getUsername(id: string) {
    const user = await this.usersModel.findOne({ _id: id });
    if (!user) throw new NotFoundException();
    return user.username;
  }
  public async getPassword(id: string) {
    const user = await this.usersModel.findOne({ _id: id });
    if (!user) throw new NotFoundException();
    return user.password;
  }
  public async updateUsername(id: string, username: string) {
    const user = await this.usersModel.findOne({ _id: id });
    if (!user) throw new NotFoundException();
    user.username = username;
    return await user.save();
  }
  public async updatePassword(id: string, password: string) {
    const user = await this.usersModel.findOne({ _id: id });
    if (!user) throw new NotFoundException();
    await user.updateOne({ password });
    return await user.save();
  }
  public async updateUser(id: string, user: UpdateUserDto) {
    const oldUser = await this.usersModel.findOne({ _id: id });
    if (!oldUser) throw new NotFoundException();
    oldUser.username = user.username;
    oldUser.password = user.password;
    oldUser.admin = user.admin;
    return await oldUser.save();
  }
  public async getAPIKey(id: string) {
    if (!(await this.usersModel.findOne({ _id: id })))
      throw new NotFoundException();
    return { apikey: (await this.usersModel.findOne({ _id: id })).apikey };
  }
  public async createNewAPIKey(id: string) {
    const user = await this.usersModel.findOne({ _id: id });
    if (!user) throw new NotFoundException();
    user.apikey = this.generateApiKey();
    return await user.save();
  }
}
