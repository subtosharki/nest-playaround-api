import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UsersService {
  private users: User[];
  constructor(
    @InjectModel('User')
    private readonly usersModel: Model<User>,
  ) {
    this.loadUsers();
  }
  private async loadUsers() {
    this.users = await this.usersModel.find();
  }

  public getAllUsers() {
    return this.users;
  }
  public getUser(id: number) {
    if (!this.users.find((user) => user.id === id))
      throw new NotFoundException();
    return this.users.find((user) => user.id === id);
  }
}
