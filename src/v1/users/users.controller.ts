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
import type {
  ListOfUsersData,
  UpdatePasswordReturnData,
  UpdateUsernameReturnData,
  UsernameReturnData,
  UserReturnData,
} from '../types/types';

@ApiTags('Users')
@Controller({ path: 'users', version: '1' })
@UseGuards(AuthGuard)
export class UsersController {
  public constructor(private readonly userService: UsersService) {}
  @Get('/')
  public async getAllUsers(): Promise<ListOfUsersData> {
    return await this.userService.getAllUsers();
  }
  @Get('/:id')
  public async getUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserReturnData> {
    return await this.userService.getUser(id);
  }
  @UseGuards(AdminGuard)
  @Delete('/:id')
  public async deleteUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserReturnData> {
    return await this.userService.deleteUser(id);
  }

  @Get('/:id/username')
  public async getUsername(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UsernameReturnData> {
    return await this.userService.getUsername(id);
  }
  @Patch('/:id/username')
  @UsePipes(ValidationPipe)
  public async updateUsername(
    @Param('id', ParseIntPipe) id: number,
    @Body() { username }: UpdateUsernameDto,
  ): Promise<UpdateUsernameReturnData> {
    return await this.userService.updateUsername(id, { username });
  }
  @Patch('/:id/password')
  @UsePipes(ValidationPipe)
  public async updatePassword(
    @Param('id', ParseIntPipe) id: number,
    @Body('newPassword') { newPassword }: UpdatePasswordDto,
    @Body('oldPassword') { oldPassword }: UpdatePasswordDto,
    @Body('confirmationPassword') { confirmationPassword }: UpdatePasswordDto,
  ): Promise<UpdatePasswordReturnData> {
    return await this.userService.updatePassword(id, {
      newPassword,
      oldPassword,
      confirmationPassword,
    });
  }
}
