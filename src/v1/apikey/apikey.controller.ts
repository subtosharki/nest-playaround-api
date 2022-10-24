import { Controller, Param, Patch } from '@nestjs/common';
import { UserIdDto } from '../users/users.dto';
import { ApikeyService } from './apikey.service';

@Controller({ path: 'apikey', version: '1' })
export class ApikeyController {
  constructor(private readonly APIkeyService: ApikeyService) {}
  @Patch('/:id')
  async createApiKey(@Param('id') id: UserIdDto) {
    return await this.APIkeyService.getNewAPIKey(id);
  }
}
