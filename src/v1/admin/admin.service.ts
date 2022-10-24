import { ExecutionContext, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserIdDto } from '../users/users.dto';

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
  public async setAdmin({ id }: UserIdDto) {
    return await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        admin: true,
      },
    });
  }
  public async removeAdmin({ id }: UserIdDto) {
    return await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        admin: false,
      },
    });
  }
  public async isAdmin(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { apikey } = request.headers;
    const { admin } = await this.prisma.user.findFirst({
      where: {
        apikey,
      },
      select: {
        admin: true,
      },
    });
    return admin === true;
  }
}
