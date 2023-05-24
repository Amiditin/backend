import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrganizationsController } from './organizations.controller';
import { OrganizationsService } from './organizations.service';
import { OrganizationEntity } from './entities/organization.entity';

@Module({
  controllers: [OrganizationsController],
  providers: [OrganizationsService],
  imports: [TypeOrmModule.forFeature([OrganizationEntity])],
  exports: [OrganizationsService],
})
export class OrganizationsModule {}
