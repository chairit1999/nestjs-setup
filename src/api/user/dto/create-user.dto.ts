import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'admin@gmail.com' })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'admin' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'admin' })
  @IsString()
  @IsNotEmpty()
  userName: string;

  @ApiProperty({ example: 'admin' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
