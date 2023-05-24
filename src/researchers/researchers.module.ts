import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ResearchersController } from './researchers.controller';
import { ResearchersService } from './researchers.service';
import { ResearcherEntity } from './entities/researcher.entity';
import { OrganizationsModule } from '@/organizations/organizations.module';

@Module({
  controllers: [ResearchersController],
  providers: [ResearchersService],
  imports: [OrganizationsModule, TypeOrmModule.forFeature([ResearcherEntity])],
  exports: [ResearchersService],
})
export class ResearchersModule {}
