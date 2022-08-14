import { Controller, Get, Param } from '@nestjs/common';
import { ErrorJSON, type User, UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('/')
  getAllUsers(): User[] | ErrorJSON {
    return this.userService.getAllUsers();
  }
  @Get('/:id')
  getUser(@Param('id') id: string): User | ErrorJSON {
    return this.userService.getUser(parseInt(id));
  }
}
