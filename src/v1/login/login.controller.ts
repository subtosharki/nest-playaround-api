import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginBody } from './login.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import type { UserAPIKeyReturnData } from '../types';
import { LoginResponseContent } from '../types';

@ApiTags('Login')
@Controller({ path: 'login', version: '1' })
export class LoginController {
  public constructor(private readonly loginService: LoginService) {}
  @ApiOkResponse(LoginResponseContent)
  @Post('/')
  @UsePipes(ValidationPipe)
  public async login(@Body() body: LoginBody): Promise<UserAPIKeyReturnData> {
    return await this.loginService.login(body);
  }
}
