import {
  type ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ERROR_MESSAGES } from '../types/consts';

@Injectable()
export class AuthService {
  public constructor(private readonly prisma: PrismaService) {}
  public async validateApiKey(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { apikey } = request.headers;
    const user = await this.prisma.user.findFirst({
      where: {
        apikey,
      },
    });
    if (user) return true;
    throw new HttpException(
      ERROR_MESSAGES.INVALID.APIKEY,
      HttpStatus.UNAUTHORIZED,
    );
  }
}
