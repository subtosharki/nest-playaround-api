import { Controller, Get, Param, Query } from '@nestjs/common';
import { ErrorJSON, type User, UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('/')
  getAllUsers(@Query('token') token: string): User[] | ErrorJSON {
    return this.userService.getAllUsers(token);
  }
  @Get('/:id')
  getUser(
    @Query('token') token: string,
    @Param('id') id: string,
  ): User | ErrorJSON {
    return this.userService.getUser(token, parseInt(id));
  }
}
