import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('/')
  getAllUsers() {
    return this.userService.getAllUsers();
  }
  @Get('/:id')
  getUser(@Param('id', new ParseIntPipe()) id: number) {
    return this.userService.getUser(id);
  }
}
