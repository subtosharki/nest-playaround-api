import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignupDto {
  @ApiProperty({ example: 'user123' })
  @IsString()
  @IsNotEmpty()
  public username: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @IsNotEmpty()
  public password: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @IsNotEmpty()
  public password2: string;
}

export class UserReturnData {
  @ApiProperty({ example: 1 })
  public id: number;

  @ApiProperty({ example: 'user123' })
  public username: string;

  @ApiProperty({ example: 'password123' })
  public password: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  public apikey: string;

  @ApiProperty({ example: false })
  public admin: boolean;
}
