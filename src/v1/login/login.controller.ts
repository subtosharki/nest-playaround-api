import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from './login.dto';

@Controller({ path: 'login', version: '1' })
export class LoginController {
  constructor(private readonly loginService: LoginService) {}
  @Post('/')
  @HttpCode(HttpStatus.OK)
  public async login(@Body() body: LoginDto) {
    return await this.loginService.login(body);
  }
}
