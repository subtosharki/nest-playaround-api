import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import {
  CreateUserDto,
  UpdateUserDto,
} from './users.dto';
import { UsersService } from './users.service';

@Controller('users')
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
  @Put('/:id')
  updateUser(@Param('id') id: string, @Body() user: UpdateUserDto) {
    return this.userService.updateUser(id, user);
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
