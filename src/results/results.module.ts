import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ResultsController } from './results.controller';
import { ResultsService } from './results.service';
import { ResultEntity } from './entities/result.entity';
import { PatientsModule } from '@/patients/patients.module';

@Module({
  controllers: [ResultsController],
  providers: [ResultsService],
  imports: [PatientsModule, TypeOrmModule.forFeature([ResultEntity])],
  exports: [ResultsService],
})
export class ResultsModule {}
