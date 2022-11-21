import { HttpException, HttpStatus } from '@nestjs/common';
import { InUseTypes, PropertyTypes } from '../types/types';

export class AlreadyInUseException extends HttpException {
  public constructor(propertyInUse: InUseTypes) {
    super(propertyInUse + ': Already in use', HttpStatus.BAD_REQUEST);
  }
}

export class UserNotFoundException extends HttpException {
  public constructor() {
    super('User not found', HttpStatus.NOT_FOUND);
  }
}

export class InvalidPropertyException extends HttpException {
  public constructor(property: PropertyTypes) {
    super(property + ': Invalid', HttpStatus.BAD_REQUEST);
  }
}
