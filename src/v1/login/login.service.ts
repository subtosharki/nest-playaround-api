import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './login.dto';
import { UtilsService } from '../utils/utils.service';

@Injectable()
export class LoginService {
  constructor(
    private prisma: PrismaService,
    private utilsService: UtilsService,
  ) {}
  public async login({ username, password }: LoginDto) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          username,
        },
      });
      if (user && (await this.utilsService.compare(password, user.password))) {
        return user;
      }
      throw new UnauthorizedException();
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
