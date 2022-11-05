import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards,
  HttpCode,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UpdatePasswordDto, UpdateUsernameDto } from './users.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';
import { AdminGuard } from '../admin/admin.guard';

@Controller({ path: 'users', version: '1' })
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getUser(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.getUser(id);
  }
  @UseGuards(AdminGuard)
  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.deleteUser(id);
  }

  @Get('/:id/username')
  @HttpCode(HttpStatus.OK)
  async getUsername(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.getUsername(id);
  }
  @Patch('/:id/username')
  @HttpCode(HttpStatus.OK)
  @UsePipes(ValidationPipe)
  async updateUsername(
    @Param('id', ParseIntPipe) id: number,
    @Body('username') username: UpdateUsernameDto,
  ) {
    return await this.userService.updateUsername(id, username);
  }
  @Patch('/:id/password')
  @HttpCode(HttpStatus.OK)
  @UsePipes(ValidationPipe)
  async updatePassword(
    @Param('id', ParseIntPipe) id: number,
    @Body('password') password: UpdatePasswordDto,
  ) {
    return await this.userService.updatePassword(id, password);
  }
}
