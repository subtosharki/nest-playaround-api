import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UpdatePasswordDto, UpdateUsernameDto, UserIdDto } from './users.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.gaurd';
import { AdminGaurd } from '../admin/admin.gaurd';

@Controller({ path: 'users', version: '1' })
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get('/')
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }
  @Get('/:id')
  async getUser(@Param('id') id: UserIdDto) {
    return await this.userService.getUser(id);
  }
  //dosnt work userId is bugged
  @UseGuards(AdminGaurd)
  @Delete('/:id')
  async deleteUser(@Param('id') id: UserIdDto) {
    return await this.userService.deleteUser(id);
  }

  @Get('/:id/username')
  async getUsername(@Param('id') id: UserIdDto) {
    return await this.userService.getUsername(id);
  }
  @Patch('/:id/username')
  async updateUsername(
    @Param('id') id: UserIdDto,
    @Body('username') username: UpdateUsernameDto,
  ) {
    return await this.userService.updateUsername(id, username);
  }
  @Patch('/:id/password')
  async updatePassword(
    @Param('id') id: UserIdDto,
    @Body('password') password: UpdatePasswordDto,
  ) {
    return await this.userService.updatePassword(id, password);
  }
}
