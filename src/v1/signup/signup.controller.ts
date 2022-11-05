import { Body, Controller, Post, HttpStatus, HttpCode } from '@nestjs/common';
import { SignupService } from './signup.service';
import { SignupDto } from './signup.dto';

@Controller({ path: 'signup', version: '1' })
export class SignupController {
  constructor(private readonly signupService: SignupService) {}
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() body: SignupDto) {
    return await this.signupService.signup(body);
  }
}
