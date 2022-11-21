import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public password: string;
}
