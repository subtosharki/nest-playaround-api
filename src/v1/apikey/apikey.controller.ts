import { Controller, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { ApikeyService } from './apikey.service';

@Controller({ path: 'apikey', version: '1' })
export class ApikeyController {
  constructor(private readonly APIkeyService: ApikeyService) {}
  @Patch('/:id')
  async createApiKey(@Param('id', ParseIntPipe) id: number) {
    return await this.APIkeyService.getNewAPIKey(id);
  }
}
