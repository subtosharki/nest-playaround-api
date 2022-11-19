import { Injectable } from '@nestjs/common';
import { UserNotFoundException } from '../exceptions/users.exception';
import { PrismaService } from '../prisma/prisma.service';
import { v4 as uuid } from 'uuid';
import { User } from '@prisma/client';

@Injectable()
export class UtilsService {
  constructor(private readonly prisma: PrismaService) {}
  public async getNewAPIKey(id: number): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
      },
    });
    if (!user) {
      throw new UserNotFoundException();
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
