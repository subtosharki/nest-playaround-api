import { Injectable } from '@nestjs/common';

export interface User {
  id: number;
  name: string;
  password: string;
  admin: boolean;
}

export interface ErrorJSON {
  message: string;
  code: number;
}

const UserNotFoundError: ErrorJSON = { message: 'User not found', code: 404 };

@Injectable()
export class UsersService {
  users: User[];
  constructor() {
    this.users = [
      {
        id: 1,
        name: 'user1',
        password: 'pass123',
        admin: true,
      },
      {
        id: 2,
        name: 'user2',
        password: 'pass123',
        admin: false,
      },
      {
        id: 3,
        name: 'user3',
        password: 'pass123',
        admin: false,
      },
    ];
  }
  public getAllUsers(): User[] {
    return this.users;
  }
  public getUser(id: number): User | ErrorJSON {
    if (!this.users.find((user) => user.id === id)) return UserNotFoundError;
    return this.users.find((user) => user.id === id);
  }
}
