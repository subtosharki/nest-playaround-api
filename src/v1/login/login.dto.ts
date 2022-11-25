import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginBody {
  @ApiProperty({ example: 'user123' })
  @IsString()
  @IsNotEmpty()
  public username: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @IsNotEmpty()
  public password: string;
}

export class UserAPIKeyReturnData {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  public apikey: string;
}
