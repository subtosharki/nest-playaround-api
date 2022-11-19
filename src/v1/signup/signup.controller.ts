import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SignupService } from './signup.service';
import { SignupDto } from './signup.dto';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';

@ApiTags('Signup')
@Controller({ path: 'signup', version: '1' })
export class SignupController {
  constructor(private readonly signupService: SignupService) {}
  @Post('/')
  @UsePipes(ValidationPipe)
  async signup(@Body() body: SignupDto): Promise<User> {
    return await this.signupService.signup(body);
  }
}
