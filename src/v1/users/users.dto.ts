import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUsernameDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public username: string;
}

export class UpdatePasswordDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public newPassword: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public oldPassword: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public confirmationPassword: string;
}
