import { Body, Controller, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { UtilsService } from '../utils/utils.service';
import { ApiHeader, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import type { User } from '@prisma/client';
import { GetNewAPIKeyBody } from './apikey.dto';
import { UserReturnData } from '../signup/signup.dto';
import { APIKeyHeaderContent } from '../types';

@ApiTags('API Key')
@ApiHeader(APIKeyHeaderContent)
@Controller({ path: 'apikey', version: '1' })
export class ApikeyController {
  public constructor(private readonly utilsService: UtilsService) {}
  @ApiOkResponse({
    description: 'Assigns a new API key to the ID given',
    type: UserReturnData,
  })
  @Patch('/:id')
  public async getNewApiKey(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: GetNewAPIKeyBody,
  ): Promise<User> {
    return await this.utilsService.getNewAPIKey(id, body);
  }
}
