import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { PrismaService } from '../prisma/prisma.service';
import { UserNotFoundException } from '../exceptions/users.exception';

@Injectable()
export class ApikeyService {
  constructor(private prisma: PrismaService) {}
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
