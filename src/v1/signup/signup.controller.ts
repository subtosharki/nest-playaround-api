import { Body, Controller, Post } from '@nestjs/common';
import { SignupService } from './signup.service';
import { SignupDto } from './signup.dto';

@Controller({ path: 'signup', version: '1' })
export class SignupController {
  constructor(private readonly signupService: SignupService) {}
  @Post()
  public async signup(@Body() body: SignupDto) {
    return await this.signupService.signup(body);
  }
}
