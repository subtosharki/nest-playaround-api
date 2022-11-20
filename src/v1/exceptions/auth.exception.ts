import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidAPIKeyException extends HttpException {
  public constructor() {
    super('Invalid API key', HttpStatus.UNAUTHORIZED);
  }
}