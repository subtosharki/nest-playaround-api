import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UtilsService } from '../utils/utils.service';

@Injectable()
export class AdminGuard implements CanActivate {
  public constructor(private readonly utilsService: UtilsService) {}
  public async canActivate(context: ExecutionContext) {
    return await this.utilsService.isAdmin(context.switchToHttp().getRequest());
  }
}
