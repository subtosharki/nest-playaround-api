import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  public async validateApiKey(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { apikey } = request.headers;
    const user = await this.prisma.user.findFirst({
      where: {
        apikey,
      },
    });
    if (user) return true;
    throw new UnauthorizedException();
  }
}
