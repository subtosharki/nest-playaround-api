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

@Controller({ path: 'users', version: '1' })
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get('/')
  getAllUsers() {
    return this.userService.getAllUsers();
  }
  @Get('/:id')
  public getUser(@Param('id') id: UserIdDto) {
    return this.userService.getUser(id);
  }
  @Delete('/:id')
  public deleteUser(@Param('id') id: UserIdDto) {
    return this.userService.deleteUser(id);
  }

  @Get('/:id/username')
  public getUsername(@Param('id') id: UserIdDto) {
    return this.userService.getUsername(id);
  }
  @Patch('/:id/username')
  public updateUsername(
    @Param('id') id: UserIdDto,
    @Body('username') username: UpdateUsernameDto,
  ) {
    return this.userService.updateUsername(id, username);
  }
  @Patch('/:id/password')
  public updatePassword(
    @Param('id') id: UserIdDto,
    @Body('password') password: UpdatePasswordDto,
  ) {
    return this.userService.updatePassword(id, password);
  }
}
