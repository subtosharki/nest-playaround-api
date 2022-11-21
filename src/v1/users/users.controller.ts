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
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import type {
  ListOfUsersData,
  UpdatePasswordReturnData,
  UpdateUsernameReturnData,
  UsernameReturnData,
  UserReturnData,
} from '../types';

@ApiTags('Users')
@Controller({ path: 'users', version: '1' })
@UseGuards(AuthGuard)
export class UsersController {
  public constructor(private readonly userService: UsersService) {}
  @ApiOkResponse({ description: 'Returns a list of all users' })
  @Get('/')
  public async getAllUsers(): Promise<ListOfUsersData> {
    return await this.userService.getAllUsers();
  }
  @ApiOkResponse({ description: 'Returns a certain users data' })
  @Get('/:id')
  public async getUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserReturnData> {
    return await this.userService.getUser(id);
  }
  @ApiOkResponse({ description: 'Deletes the ID given' })
  @UseGuards(AdminGuard)
  @Delete('/:id')
  public async deleteUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserReturnData> {
    return await this.userService.deleteUser(id);
  }
  @ApiOkResponse({ description: 'Returns the IDs username' })
  @Get('/:id/username')
  public async getUsername(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UsernameReturnData> {
    return await this.userService.getUsername(id);
  }
  @ApiOkResponse({ description: 'Change the IDs username' })
  @Patch('/:id/username')
  @UsePipes(ValidationPipe)
  public async updateUsername(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUsernameDto,
  ): Promise<UpdateUsernameReturnData> {
    return await this.userService.updateUsername(id, body);
  }
  @ApiOkResponse({ description: 'Change the IDs password' })
  @Patch('/:id/password')
  @UsePipes(ValidationPipe)
  public async updatePassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdatePasswordDto,
  ): Promise<UpdatePasswordReturnData> {
    return await this.userService.updatePassword(id, body);
  }
}
