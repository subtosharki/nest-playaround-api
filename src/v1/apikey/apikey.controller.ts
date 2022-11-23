import { Body, Controller, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { UtilsService } from '../utils/utils.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import type { User } from '@prisma/client';
import { GetNewApiKeyDto } from './apikey.dto';

@ApiTags('API Key')
@Controller({ path: 'apikey', version: '1' })
export class ApikeyController {
  public constructor(private readonly utilsService: UtilsService) {}
  @ApiOkResponse({ description: 'Assigns a new API key to the ID given' })
  @Patch('/:id')
  public async getNewApiKey(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: GetNewApiKeyDto,
  ): Promise<User> {
    return await this.utilsService.getNewAPIKey(id, body);
  }
}
