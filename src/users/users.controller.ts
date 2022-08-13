import { Controller, Get, Query } from '@nestjs/common';
import { User, UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('/')
  getUsers(@Query('token') token: string): User[] | string {
    return this.userService.getUsers(token);
  }
}
