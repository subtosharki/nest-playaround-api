import {
  type ExecutionContext,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { InvalidAPIKeyException } from '../exceptions/auth.exception';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  public async validateApiKey(context: ExecutionContext) {
    try {
      const request = context.switchToHttp().getRequest();
      const { apikey } = request.headers;
      const user = await this.prisma.user.findFirst({
        where: {
          apikey,
        },
      });
      if (user) return true;
      throw new InvalidAPIKeyException();
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
