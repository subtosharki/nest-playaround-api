import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SignupBody } from './signup.dto';
import { genSalt, hash as genHash } from 'bcrypt';
import type { User } from '@prisma/client';
import { ErrorMessages, LogType } from '../types';
import { UtilsService } from '../utils/utils.service';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class SignupService {
  public constructor(
    private readonly prisma: PrismaService,
    private readonly utilService: UtilsService,
    private readonly loggerService: LoggerService,
  ) {}
  public async signup({
    username,
    password,
    password2,
  }: SignupBody): Promise<User> {
    const [usernameTaken, hashedPassword] = await Promise.all([
      this.utilService.getUserByUsername(username, true),
      genHash(password, await genSalt()),
    ]);
    if (usernameTaken) {
      throw new HttpException(
        ErrorMessages.USERNAME_ALREADY_EXISTS,
        HttpStatus.BAD_REQUEST,
      );
    }
    if (password !== password2) {
      throw new HttpException(
        ErrorMessages.PASSWORDS_DO_NOT_MATCH,
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = await this.prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });
    await this.loggerService.log(LogType.USER_CREATED, user);
    return user;
  }
}
