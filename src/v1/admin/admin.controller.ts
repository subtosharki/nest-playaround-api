import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { UserIdDto } from '../users/users.dto';

@Controller({ path: 'admin', version: '1' })
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  @Get('/')
  public getAllAdmins() {
    return this.adminService.getAllAdmins();
  }
  @Post('/set')
  public setAdmin(@Param() id: UserIdDto) {
    return this.adminService.setAdmin(id);
  }
  @Delete('/remove')
  public removeAdmin(@Param() id: UserIdDto) {
    return this.adminService.removeAdmin(id);
  }
}
