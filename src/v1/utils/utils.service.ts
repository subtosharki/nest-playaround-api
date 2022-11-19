import { Injectable } from '@nestjs/common';
import { UserNotFoundException } from '../exceptions/users.exception';
import { PrismaService } from '../prisma/prisma.service';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UtilsService {
  constructor(private readonly prisma: PrismaService) {}
  public async getNewAPIKey(id: number) {
    try {
      return await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          apikey: uuid(),
        },
      });
    } catch (e) {
      throw new UserNotFoundException();
    }
  }
}
