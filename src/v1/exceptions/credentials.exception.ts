import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorMessages } from '../types';

export class InvalidCredentialsException extends HttpException {
  constructor() {
    super(ErrorMessages.INVALID_CREDENTIALS, HttpStatus.BAD_REQUEST);
  }
}
