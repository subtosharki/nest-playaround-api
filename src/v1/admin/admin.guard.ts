import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AdminService } from './admin.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly adminService: AdminService) {}
  public async canActivate(context: ExecutionContext) {
    return await this.adminService.isAdmin(context.switchToHttp().getRequest());
  }
}
