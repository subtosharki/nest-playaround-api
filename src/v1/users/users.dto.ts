import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserIdDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id: number;
}

export class UpdateUsernameDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username: string;
}

export class UpdatePasswordDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  newPassword: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  oldPassword: string;
}
