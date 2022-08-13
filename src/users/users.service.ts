import { Injectable } from '@nestjs/common';

export interface User {
  id: number;
  name: string;
  password: string;
  admin: boolean;
}

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
  public getUsers(userToken: string): User[] | string {
    if (!this.checkAuth(userToken)) return 'Unauthorized' + userToken;
    return this.users;
  }
}
