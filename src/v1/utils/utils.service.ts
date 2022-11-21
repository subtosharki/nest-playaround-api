import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { v4 as uuid } from 'uuid';
import { User } from '@prisma/client';
import { ERROR_MESSAGES } from '../types';

@Injectable()
export class UtilsService {
  public constructor(private readonly prisma: PrismaService) {}
  public async getNewAPIKey(id: number): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
      },
    });
    if (!user) {
      throw new HttpException(
        ERROR_MESSAGES.NOT_FOUND.USER,
        HttpStatus.NOT_FOUND,
      );
    }
    return await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        apikey: uuid(),
      },
    });
  }
}
