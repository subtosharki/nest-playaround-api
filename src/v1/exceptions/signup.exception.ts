import { HttpException, HttpStatus } from '@nestjs/common';

export class UsernameAlreadyExistsException extends HttpException {
  constructor() {
    super('Username already exists', HttpStatus.BAD_REQUEST);
  }
}

export class PasswordsDoNotMatchException extends HttpException {
  constructor() {
    super('Passwords do not match', HttpStatus.BAD_REQUEST);
  }
}
