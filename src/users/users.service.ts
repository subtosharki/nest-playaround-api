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

const UnauthorizedError: ErrorJSON = { message: 'Unauthorized', code: 401 };
const UserNotFoundError: ErrorJSON = { message: 'User not found', code: 404 };

@Injectable()
export class UsersService {
  authCode: string;
  users: User[];
  constructor() {
    this.authCode = 'testcode';
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
  private checkAuth(userToken: string): boolean {
    return userToken === this.authCode;
  }
  public getAllUsers(userToken: string): User[] | ErrorJSON {
    if (!this.checkAuth(userToken)) return UnauthorizedError;
    return this.users;
  }
  public getUser(userToken: string, id: number): User | ErrorJSON {
    if (!this.checkAuth(userToken)) return UnauthorizedError;
    if (!this.users.find((user) => user.id === id)) return UserNotFoundError;
    return this.users.find((user) => user.id === id);
  }
}
