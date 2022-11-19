import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from './login.dto';
import { ApiTags } from '@nestjs/swagger';
import type { User } from '@prisma/client';

@ApiTags('Login')
@Controller({ path: 'login', version: '1' })
export class LoginController {
  constructor(private readonly loginService: LoginService) {}
  @Post('/')
  @UsePipes(ValidationPipe)
  public async login(@Body() body: LoginDto): Promise<User> {
    return await this.loginService.login(body);
  }
}
