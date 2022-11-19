import {
  Injectable,
  type CanActivate,
  type ExecutionContext,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    return await this.authService.validateApiKey(context);
  }
}
