import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  DeleteUserDto,
  GetPasswordDto,
  GetUserDto,
  GetUsernameDto,
  UpdatePasswordDto,
  UpdateUsernameDto,
  UserIdDto,
} from './users.dto';
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
  public getUser(@Param('id') id: GetUserDto) {
    return this.userService.getUser(id);
  }
  @Delete('/:id')
  public deleteUser(@Param('id') id: DeleteUserDto) {
    return this.userService.deleteUser(id);
  }

  @Get('/:id/username')
  public getUsername(@Param('id') id: GetUsernameDto) {
    return this.userService.getUsername(id);
  }
  @Get('/:id/password')
  public getPassword(@Param('id') id: GetPasswordDto) {
    return this.userService.getPassword(id);
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

  // need to make own path for apikey stuff
  @Get('/:id/apikey')
  public getApiKey(@Param('id') id: UserIdDto) {
    return this.userService.getAPIKey(id);
  }
  @Post('/:id/apikey')
  public createApiKey(@Param('id') id: UserIdDto) {
    return this.userService.createNewAPIKey(id);
  }
}
