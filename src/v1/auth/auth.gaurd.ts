import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private prisma: PrismaService,
    private readonly authService: AuthService,
  ) {}
  public async canActivate(context: ExecutionContext) {
    return await this.authService.validateApiKey(context);
  }
}
