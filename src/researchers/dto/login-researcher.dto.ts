import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';

export class LoginResearcherDto {
  @ApiProperty({ default: 'address@mail.ru' })
  @IsEmail()
  email: string;

  @ApiProperty({ default: '12345' })
  @MinLength(4)
  password: string;
}
