import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './users.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User')
    private readonly usersModel: Model<User>,
  ) {}
  private async generateApiKey() {
    return uuid();
  }
  public async getAllUsers() {
    return await this.usersModel.find();
  }
  public async getUser(id: string) {
    try {
      return await this.usersModel.findOne({ _id: id });
    } catch (e) {
      throw new NotFoundException();
    }
  }
  public async createUser(username: string, password: string) {
    return new this.usersModel({
      username,
      password,
      admin: false,
    }).save();
  }
  public async deleteUser(id: string) {
    try {
      const user = await this.usersModel.findOne({ _id: id });
      return await user.remove();
    } catch (e) {
      throw new NotFoundException();
    }
  }
  public async getUsername(id: string) {
    try {
      return {
        username: (await this.usersModel.findOne({ _id: id })).username,
      };
    } catch (e) {
      throw new NotFoundException();
    }
  }
  public async getPassword(id: string) {
    try {
      return {
        password: (await this.usersModel.findOne({ _id: id })).password,
      };
    } catch (e) {
      throw new NotFoundException();
    }
  }
  public async updateUsername(id: string, username: string) {
    try {
      const user = await this.usersModel.findOne({ _id: id });
      user.username = username;
      return await user.save();
    } catch (e) {
      throw new NotFoundException();
    }
  }
  public async updatePassword(id: string, password: string) {
    try {
      const user = await this.usersModel.findOne({ _id: id });
      user.password = password;
      return await user.save();
    } catch (e) {
      throw new NotFoundException();
    }
  }
  public async getAPIKey(id: string) {
    try {
      return { apikey: (await this.usersModel.findOne({ _id: id })).apikey };
    } catch (e) {
      throw new NotFoundException();
    }
  }
  public async createNewAPIKey(id: string) {
    try {
      const user = await this.usersModel.findOne({ _id: id });
      user.apikey = await this.generateApiKey();
      return await user.save();
    } catch (e) {
      throw new NotFoundException();
    }
  }
}
