import { HttpException, HttpStatus } from '@nestjs/common';

export class PasswordAlreadyInUseException extends HttpException {
  constructor() {
    super('Password already in use', HttpStatus.BAD_REQUEST);
  }
}

export class UsernameAlreadyInUseException extends HttpException {
  constructor() {
    super('Username already in use', HttpStatus.BAD_REQUEST);
  }
}

export class UserNotFoundException extends HttpException {
  constructor() {
    super('User not found', HttpStatus.NOT_FOUND);
  }
}

export class InvalidOldPasswordException extends HttpException {
  constructor() {
    super('Invalid old password', HttpStatus.BAD_REQUEST);
  }
}
