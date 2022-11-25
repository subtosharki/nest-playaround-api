import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UpdatePasswordBody, UpdateUsernameBody } from './users.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';
import { AdminGuard } from '../admin/admin.guard';
import { ApiHeader, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  type ListOfUsersData,
  type UpdatePasswordReturnData,
  type UpdateUsernameReturnData,
  type UsernameReturnData,
  type UserReturnData,
  APIKeyHeaderContent,
  GetAllUsersResponseContent,
  GetUserResponseContent,
  DeleteUserResponseContent,
  GetUsernameResponseContent,
  UpdateUsernameResponseContent,
} from '../types';

@ApiTags('Users')
@ApiHeader(APIKeyHeaderContent)
@Controller({ path: 'users', version: '1' })
export class UsersController {
  public constructor(private readonly userService: UsersService) {}
  @ApiOkResponse(GetAllUsersResponseContent)
  @Get('/')
  @UseGuards(AuthGuard)
  public async getAllUsers(): Promise<ListOfUsersData> {
    return await this.userService.getAllUsers();
  }
  @ApiOkResponse(GetUserResponseContent)
  @Get('/:id')
  public async getUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserReturnData> {
    return await this.userService.getUser(id);
  }
  @ApiOkResponse(DeleteUserResponseContent)
  @UseGuards(AdminGuard)
  @Delete('/:id')
  public async deleteUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserReturnData> {
    return await this.userService.deleteUser(id);
  }
  @ApiOkResponse(GetUsernameResponseContent)
  @Get('/:id/username')
  public async getUsername(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UsernameReturnData> {
    return await this.userService.getUsername(id);
  }
  @ApiOkResponse(UpdateUsernameResponseContent)
  @ApiHeader(APIKeyHeaderContent)
  @Patch('/:id/username')
  public async updateUsername(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUsernameBody,
  ): Promise<UpdateUsernameReturnData> {
    return await this.userService.updateUsername(id, body);
  }
  @ApiOkResponse()
  @ApiHeader(APIKeyHeaderContent)
  @Patch('/:id/password')
  public async updatePassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdatePasswordBody,
  ): Promise<UpdatePasswordReturnData> {
    return await this.userService.updatePassword(id, body);
  }
}
