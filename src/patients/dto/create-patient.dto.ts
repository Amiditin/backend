import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsEnum, IsMobilePhone, MinLength } from 'class-validator';

import { EEducationTypes, EGenderTypes } from '../patients.types';

export class CreatePatientDto {
  @ApiProperty({ default: 'Иванов Ивано Иванович' })
  @MinLength(5)
  fullname: string;

  @ApiProperty({ default: 'address@mail.ru' })
  @IsEmail()
  email: string;

  @ApiProperty({ default: '89212597422' })
  @IsMobilePhone()
  phone: string;

  @ApiProperty({ default: EGenderTypes.MALE, enum: EGenderTypes })
  @IsEnum(EGenderTypes)
  gender: EGenderTypes;

  @ApiProperty({ default: EEducationTypes.SECONDARY_GENERAL, enum: EEducationTypes })
  @IsEnum(EEducationTypes)
  education: EEducationTypes;

  @ApiProperty({ default: 'Футбол' })
  sport: string;

  @ApiProperty({ default: '2000-03-02' })
  @IsDateString()
  dateBirth: Date;

  @ApiProperty({ default: 'uuid' })
  researcher: string;
}
