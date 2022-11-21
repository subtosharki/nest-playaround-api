import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from './login.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserAPIKeyReturnData as UserAPIKeyReturnDataClass } from './login.dto';
import type { UserAPIKeyReturnData } from '../types';

@ApiTags('Login')
@Controller({ path: 'login', version: '1' })
export class LoginController {
  public constructor(private readonly loginService: LoginService) {}
  @ApiOkResponse({
    description: 'Returns the Users APIKey if credentials are valid',
    type: UserAPIKeyReturnDataClass,
  })
  @Post('/')
  @UsePipes(ValidationPipe)
  public async login(@Body() body: LoginDto): Promise<UserAPIKeyReturnData> {
    return await this.loginService.login(body);
  }
}
