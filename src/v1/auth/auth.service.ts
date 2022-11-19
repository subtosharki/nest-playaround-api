import { type ExecutionContext, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { InvalidAPIKeyException } from '../exceptions/auth.exception';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}
  public async validateApiKey(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { apikey } = request.headers;
    const user = await this.prisma.user.findFirst({
      where: {
        apikey,
      },
    });
    if (user) return true;
    throw new InvalidAPIKeyException();
  }
}
