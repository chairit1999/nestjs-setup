import { IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserSigninDto {
  @ApiProperty({ example: 'admin' })
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => {
    return String(value).trim().toLowerCase();
  })
  username: string;

  @ApiProperty({ example: 'admin' })
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => {
    return String(value).trim();
  })
  password: string;
}
