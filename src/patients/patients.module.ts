import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PatientsController } from './patients.controller';
import { PatientsService } from './patients.service';
import { PatientEntity } from './entities/patient.entity';
import { ResearchersModule } from '@/researchers/researchers.module';

@Module({
  controllers: [PatientsController],
  providers: [PatientsService],
  imports: [ResearchersModule, TypeOrmModule.forFeature([PatientEntity])],
  exports: [PatientsService],
})
export class PatientsModule {}
