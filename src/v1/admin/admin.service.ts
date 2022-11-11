import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { Request } from 'express';
import { MissingPermissionException } from '../exceptions/permission.exception';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}
  public async getAllAdmins() {
    return await this.prisma.user.findMany({
      where: {
        admin: true,
      },
    });
  }
  public async setAdmin(id: number) {
    try {
      const { admin } = await this.prisma.user.findFirst({
        where: {
          id,
        },
        select: {
          admin: true,
        },
      });
      if (admin) {
        return await this.prisma.user.update({
          where: {
            id,
          },
          data: {
            admin: false,
          },
        });
      } else {
        return await this.prisma.user.update({
          where: {
            id,
          },
          data: {
            admin: true,
          },
        });
      }
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
  public async isAdmin(request: Request) {
    try {
      const apikey = <string>request.headers['x-api-key'];
      const admin = await this.prisma.user.findFirst({
        where: {
          apikey,
        },
        select: {
          admin: true,
        },
      });
      if (admin) return true;
      throw new MissingPermissionException('ADMIN');
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
