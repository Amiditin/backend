import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsEnum, IsMobilePhone, MinLength } from 'class-validator';

export class CreateResultDto {
  @ApiProperty({ default: '2023-05-16' })
  @IsDateString()
  dateStart: Date;

  @ApiProperty({ default: '2023-05-17' })
  @IsDateString()
  dateEnd: Date;

  @ApiProperty({ default: 'uuid' })
  patient: string;
}
