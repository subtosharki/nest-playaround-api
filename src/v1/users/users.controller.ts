import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UpdatePasswordDto, UpdateUsernameDto } from './users.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';
import { AdminGuard } from '../admin/admin.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller({ path: 'users', version: '1' })
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get('/')
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }
  @Get('/:id')
  async getUser(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.getUser(id);
  }
  @UseGuards(AdminGuard)
  @Delete('/:id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.deleteUser(id);
  }

  @Get('/:id/username')
  async getUsername(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.getUsername(id);
  }
  @Patch('/:id/username')
  @UsePipes(ValidationPipe)
  async updateUsername(
    @Param('id', ParseIntPipe) id: number,
    @Body() { username }: UpdateUsernameDto,
  ) {
    return await this.userService.updateUsername(id, { username });
  }
  @Patch('/:id/password')
  @UsePipes(ValidationPipe)
  async updatePassword(
    @Param('id', ParseIntPipe) id: number,
    @Body('body') { newPassword }: UpdatePasswordDto,
    @Body('oldPassword') { oldPassword }: UpdatePasswordDto,
    @Body('confirmationPassword') { confirmationPassword }: UpdatePasswordDto,
  ) {
    return await this.userService.updatePassword(id, {
      newPassword,
      oldPassword,
      confirmationPassword,
    });
  }
}
