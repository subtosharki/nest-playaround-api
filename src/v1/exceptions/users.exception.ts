import { HttpException, HttpStatus } from '@nestjs/common';

export enum InUseTypes {
  'USERNAME',
  'PASSWORD',
}
export enum PropertyTypes {
  'OLD_PASSWORD',
  'CONFIRMATION_PASSWORD',
}

export class AlreadyInUseException extends HttpException {
  constructor(propertyInUse: InUseTypes) {
    super(propertyInUse + ': Already in use', HttpStatus.BAD_REQUEST);
  }
}

export class UserNotFoundException extends HttpException {
  constructor() {
    super('User not found', HttpStatus.NOT_FOUND);
  }
}

export class InvalidPropertyException extends HttpException {
  constructor(property: PropertyTypes) {
    super(property + ': Invalid', HttpStatus.BAD_REQUEST);
  }
}
