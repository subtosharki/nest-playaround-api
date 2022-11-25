import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUsernameBody {
  @ApiProperty({ example: '321user' })
  @IsString()
  @IsNotEmpty()
  public username: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @IsNotEmpty()
  public password: string;
}

export class UpdatePasswordBody {
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

export class UsernameReturnData {
  @ApiProperty({ example: 'user123' })
  @IsString()
  @IsNotEmpty()
  public username: string;
}
