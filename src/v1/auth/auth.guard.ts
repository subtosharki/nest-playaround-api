import {
  Injectable,
  type CanActivate,
  type ExecutionContext,
} from '@nestjs/common';
import { UtilsService } from '../utils/utils.service';

@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(private readonly utilsService: UtilsService) {}
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    return await this.utilsService.validateApiKey(
      context.switchToHttp().getRequest(),
    );
  }
}
