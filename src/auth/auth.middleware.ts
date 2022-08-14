import { Injectable, NestMiddleware } from '@nestjs/common';
import type { Request, Response, NextFunction } from 'express';
import type { ErrorJSON } from '../users/users.service';

const AUTH_CODE = 'testcode';

const UnauthorizedError: ErrorJSON = { message: 'Unauthorized', code: 401 };

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.query.token !== AUTH_CODE)
      return res.status(401).send(UnauthorizedError);
    next();
  }
}
