import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SignupService } from './signup.service';
import { SignupDto, UserReturnData } from './signup.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import type { User } from '@prisma/client';

@ApiTags('Signup')
@Controller({ path: 'signup', version: '1' })
export class SignupController {
  public constructor(private readonly signupService: SignupService) {}
  @ApiCreatedResponse({
    description: 'Returns the new user data if a new account is created',
    type: UserReturnData,
  })
  @Post('/')
  @UsePipes(ValidationPipe)
  public async signup(@Body() body: SignupDto): Promise<User> {
    return await this.signupService.signup(body);
  }
}
