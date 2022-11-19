import { HttpException, HttpStatus } from '@nestjs/common';

export class UsernameAlreadyExistsException extends HttpException {
  public constructor() {
    super('Username already exists', HttpStatus.BAD_REQUEST);
  }
}

export class PasswordsDoNotMatchException extends HttpException {
  public constructor() {
    super('Passwords do not match', HttpStatus.BAD_REQUEST);
  }
}
