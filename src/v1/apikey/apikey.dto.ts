import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetNewApiKeyDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'password123' })
  public password: string;
}

export class ApikeyDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  public 'x-api-key': string;
}
