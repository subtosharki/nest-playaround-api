import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { PrismaService } from '../prisma/prisma.service';
import { HashService } from '../hash/hash.service';

@Injectable()
export class ApikeyService {
  constructor(
    private prisma: PrismaService,
    private hashService: HashService,
  ) {}
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
      throw new NotFoundException();
    }
  }
}
