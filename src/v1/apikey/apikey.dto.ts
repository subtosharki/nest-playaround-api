import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetNewAPIKeyBody {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'password123' })
  public password: string;
}
