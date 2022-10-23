import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}
  public async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const user = await this.prisma.user.findUnique({
      where: {
        apikey: request.headers['apikey'],
      },
    });
    if (user) return true;
    throw new UnauthorizedException();
  }
}
