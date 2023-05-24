import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsMobilePhone, MinLength } from 'class-validator';

export class CreateResearcherDto {
  @ApiProperty({ default: 'Иванов Ивано Иванович' })
  @MinLength(5)
  fullname: string;

  @ApiProperty({ default: 'address@mail.ru' })
  @IsEmail()
  email: string;

  @ApiProperty({ default: '1234' })
  @MinLength(4)
  password: string;

  @ApiProperty({ default: '89212597422' })
  @IsMobilePhone()
  phone: string;

  @ApiProperty({ default: false })
  @IsBoolean()
  isVerified?: boolean;

  @ApiProperty({ default: 'uuid' })
  organization: string;
}
