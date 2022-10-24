import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { UserIdDto } from '../users/users.dto';
import { AdminGaurd } from './admin.gaurd';

@UseGuards(AdminGaurd)
@Controller({ path: 'admin', version: '1' })
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  @Get('/')
  async getAllAdmins() {
    return await this.adminService.getAllAdmins();
  }
  @Post('/set')
  async setAdmin(@Param() id: UserIdDto) {
    return await this.adminService.setAdmin(id);
  }
  @Delete('/remove')
  async removeAdmin(@Param() id: UserIdDto) {
    return await this.adminService.removeAdmin(id);
  }
}
