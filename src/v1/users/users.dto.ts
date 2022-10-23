import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetUserDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id: number;
}

export class GetUsernameDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id: number;
}

export class GetPasswordDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id: number;
}

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class DeleteUserDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
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
  password: string;
}
