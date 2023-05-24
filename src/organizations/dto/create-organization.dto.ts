import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsFQDN, IsMobilePhone, MinLength } from 'class-validator';

export class CreateOrganizationDto {
  @ApiProperty({ default: 'Общество с ограниченной ответственностью' })
  @MinLength(5)
  name: string;

  @ApiProperty({ default: 'ООО' })
  abbreviation: string | null;

  @ApiProperty({ default: 'address@mail.ru' })
  @IsEmail()
  email: string;

  @ApiProperty({ default: '89120120012' })
  @IsMobilePhone('ru-RU')
  phone: string;

  @ApiProperty({ default: 'Василий' })
  @MinLength(5)
  contact: string;

  @ApiProperty({ default: 'Нижний Новгород' })
  address: string | null;

  @ApiProperty({ default: 'ооо.nn' })
  @IsFQDN()
  website: string | null;
}
