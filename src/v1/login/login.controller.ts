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

@ApiTags('Login')
@Controller({ path: 'login', version: '1' })
export class LoginController {
  constructor(private readonly loginService: LoginService) {}
  @Post('/')
  @UsePipes(ValidationPipe)
  public async login(@Body() body: LoginDto) {
    return await this.loginService.login(body);
  }
}
