import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SignupService } from './signup.service';
import { SignupBody } from './signup.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import type { User } from '@prisma/client';
import { SignupResponseContent } from '../types';

@ApiTags('Signup')
@Controller({ path: 'signup', version: '1' })
export class SignupController {
  public constructor(private readonly signupService: SignupService) {}
  @ApiCreatedResponse(SignupResponseContent)
  @Post('/')
  @UsePipes(ValidationPipe)
  public async signup(@Body() body: SignupBody): Promise<User> {
    return await this.signupService.signup(body);
  }
}
