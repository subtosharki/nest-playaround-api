import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';
import { AuthService } from './auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const userId = req.header('apikey');
    console.log(userId);
    if (await this.authService.checkAuth(userId))
      throw new UnauthorizedException();
    next();
  }
}
