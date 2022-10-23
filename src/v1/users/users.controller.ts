import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  CreateUserDto,
  DeleteUserDto,
  GetPasswordDto,
  GetUserDto,
  GetUsernameDto,
  UpdatePasswordDto,
  UpdateUsernameDto,
} from './users.dto';
import { UsersService } from './users.service';

@Controller({ path: 'users', version: '1' })
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get('/')
  getAllUsers() {
    return this.userService.getAllUsers();
  }
  @Get('/:id')
  getUser(@Param('id') id: GetUserDto) {
    return this.userService.getUser(id);
  }
  @Post('/')
  createUser(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
  }
  @Delete('/:id')
  deleteUser(@Param('id') id: DeleteUserDto) {
    return this.userService.deleteUser(id);
  }

  @Get('/:id/username')
  getUsername(@Param('id') id: GetUsernameDto) {
    return this.userService.getUsername(id);
  }
  @Get('/:id/password')
  getPassword(@Param('id') id: GetPasswordDto) {
    return this.userService.getPassword(id);
  }

  @Patch('/:id/username')
  updateUsername(
    @Param('id') id: number,
    @Body('username') username: UpdateUsernameDto,
  ) {
    return this.userService.updateUsername(id, username);
  }
  @Patch('/:id/password')
  updatePassword(
    @Param('id') id: number,
    @Body('password') password: UpdatePasswordDto,
  ) {
    return this.userService.updatePassword(id, password);
  }

  @Get('/:id/apikey')
  getApiKey(@Param('id') id: number) {
    return this.userService.getAPIKey(id);
  }
  @Post('/:id/apikey')
  createApiKey(@Param('id') id: number) {
    return this.userService.createNewAPIKey(id);
  }
}
