import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LoginService } from './login.service';
import type { LoginDto } from './login.dto';

@Controller({ path: 'login', version: '1' })
export class LoginController {
  constructor(private readonly loginService: LoginService) {}
  @Post('/')
  @HttpCode(HttpStatus.OK)
  @UsePipes(ValidationPipe)
  public async login(@Body() body: LoginDto) {
    return await this.loginService.login(body);
  }
}
