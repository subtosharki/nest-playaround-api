import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SignupDto } from './signup.dto';
import { genSalt, hash as genHash } from 'bcrypt';
import type { User } from '@prisma/client';
import { ERROR_MESSAGES } from '../types';

@Injectable()
export class SignupService {
  public constructor(private readonly prisma: PrismaService) {}
  public async signup({
    username,
    password,
    password2,
  }: SignupDto): Promise<User> {
    const [usernameTaken, hashedPassword] = await Promise.all([
      this.prisma.user.findFirst({
        where: {
          username,
        },
      }),
      genHash(password, await genSalt()),
    ]);
    if (usernameTaken) {
      throw new HttpException(
        ERROR_MESSAGES.ALREADY_EXISTS.USERNAME,
        HttpStatus.BAD_REQUEST,
      );
    }
    if (password !== password2) {
      throw new HttpException(
        ERROR_MESSAGES.DO_NOT_MATCH.PASSWORDS,
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });
  }
}
