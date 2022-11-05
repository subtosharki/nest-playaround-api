import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Request } from 'express';

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
  }
  public async isAdmin(request: Request) {
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
    throw new UnauthorizedException();
  }
}
