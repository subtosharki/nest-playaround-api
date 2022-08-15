import {
  IsBoolean,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  public username: string;

  @IsString()
  @IsNotEmpty()
  public password: string;
}

export class UpdateUsernameDto {
  @IsString()
  @IsNotEmpty()
  public username: string;
}

export class UpdatePasswordDto {
  @IsString()
  @IsNotEmpty()
  public password: string;
}

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  public username: string;

  @IsString()
  @IsNotEmpty()
  public password: string;

  @IsBoolean()
  @IsNotEmpty()
  public admin: boolean;
}

export class UpdateAdminPermDto {
  @IsBoolean()
  @IsNotEmpty()
  public admin: boolean;
}
