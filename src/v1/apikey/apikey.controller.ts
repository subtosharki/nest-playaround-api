import { Controller, Param, Patch } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserIdDto } from '../users/users.dto';
import { ApikeyService } from './apikey.service';

@Controller({ path: 'apikey', version: '1' })
export class ApikeyController {
  constructor(
    private prisma: PrismaService,
    private readonly APIkeyService: ApikeyService,
  ) {}
  @Patch('/:id')
  public createApiKey(@Param('id') id: UserIdDto) {
    return this.APIkeyService.getNewAPIKey(id);
  }
}
