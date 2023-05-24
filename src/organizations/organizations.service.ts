import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';

import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { OrganizationEntity } from './entities/organization.entity';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(OrganizationEntity)
    private repository: Repository<OrganizationEntity>,
  ) {}

  async findAll(): Promise<OrganizationEntity[]> {
    return this.repository.find();
  }

  async findById(id: string): Promise<OrganizationEntity> {
    return this.repository.findOneBy({ id });
  }

  async create(dto: CreateOrganizationDto): Promise<OrganizationEntity> {
    return this.repository.save(dto);
  }

  async update(id: string, dto: UpdateOrganizationDto): Promise<UpdateResult> {
    return this.repository.update(id, dto);
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
