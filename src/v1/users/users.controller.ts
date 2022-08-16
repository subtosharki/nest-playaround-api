import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './users.dto';
import { UsersService } from './users.service';

@Controller({path: "users", version: '1'})
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get('/')
  getAllUsers() {
    return this.userService.getAllUsers();
  }
  @Get('/:id')
  getUser(@Param('id') id: string) {
    return this.userService.getUser(id);
  }
  @Post('/')
  createUser(@Body() user: CreateUserDto) {
    return this.userService.createUser(user.username, user.password);
  }
  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

  @Get('/:id/username')
  getUsername(@Param('id') id: string) {
    return this.userService.getUsername(id);
  }
  @Get('/:id/password')
  getPassword(@Param('id') id: string) {
    return this.userService.getPassword(id);
  }

  @Patch('/:id/username')
  updateUsername(@Param('id') id: string, @Body('username') username: string) {
    return this.userService.updateUsername(id, username);
  }
  @Patch('/:id/password')
  updatePassword(@Param('id') id: string, @Body('password') password: string) {
    return this.userService.updatePassword(id, password);
  }

  @Get('/:id/apikey')
  getApiKey(@Param('id') id: string) {
    return this.userService.getAPIKey(id);
  }
  @Post('/:id/apikey')
  createApiKey(@Param('id') id: string) {
    return this.userService.createNewAPIKey(id);
  }
}
