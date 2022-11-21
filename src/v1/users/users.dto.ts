import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUsernameDto {
  @ApiProperty({ example: '321user' })
  @IsString()
  @IsNotEmpty()
  public username: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @IsNotEmpty()
  public password: string;
}

export class UpdatePasswordDto {
  @ApiProperty({ example: '321password' })
  @IsString()
  @IsNotEmpty()
  public newPassword: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @IsNotEmpty()
  public oldPassword: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @IsNotEmpty()
  public confirmationPassword: string;
}
