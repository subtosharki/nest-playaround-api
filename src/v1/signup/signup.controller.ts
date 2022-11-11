import {
  Body,
  Controller,
  Post,
  HttpStatus,
  HttpCode,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SignupService } from './signup.service';
import type { SignupDto } from './signup.dto';

@Controller({ path: 'signup', version: '1' })
export class SignupController {
  constructor(private readonly signupService: SignupService) {}
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(ValidationPipe)
  async signup(@Body() body: SignupDto) {
    return await this.signupService.signup(body);
  }
}
