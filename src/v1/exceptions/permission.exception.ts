import { HttpException, HttpStatus } from '@nestjs/common';

export class MissingPermissionException extends HttpException {
  public constructor(permission: string) {
    super(
      { 'Missing following permission(s)': permission },
      HttpStatus.FORBIDDEN,
    );
  }
}
