import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateResearcherDto } from './dto/create-researcher.dto';
import { UpdateResearcherDto } from './dto/update-researcher.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ResearcherEntity } from './entities/researcher.entity';
import { Repository, UpdateResult } from 'typeorm';
import { OrganizationsService } from '@/organizations/organizations.service';
import { exceptionNotFound, exceptionBadRequestUuid } from '@/exceptions/index';
import * as argon2 from 'argon2';

const exceptionMessages = {
  notFound: exceptionNotFound('Researcher'),
  badRequestUuid: exceptionBadRequestUuid('Organization'),
};

@Injectable()
export class ResearchersService {
  constructor(
    @InjectRepository(ResearcherEntity) private repository: Repository<ResearcherEntity>,
    private organizationsService: OrganizationsService,
  ) {}

  async findAll(): Promise<ResearcherEntity[]> {
    return this.repository.find({ relations: { organization: true } });
  }

  async findByEmail(email: string): Promise<ResearcherEntity> {
    const researcher = await this.repository.findOne({
      where: { email },
      relations: { organization: true },
    });

    return researcher;
  }

  async findById(id: string): Promise<ResearcherEntity> {
    const researcher = await this.repository.findOne({
      where: { id },
      relations: { organization: true, patients: true },
    });

    if (!researcher) {
      throw new NotFoundException(exceptionMessages.notFound);
    }

    return researcher;
  }

  async create(dto: CreateResearcherDto): Promise<ResearcherEntity> {
    const organization = await this.organizationsService.findById(dto.organization);

    if (!organization) {
      throw new BadRequestException(exceptionMessages.badRequestUuid);
    }

    return this.repository.save({ ...dto, organization });
  }

  async update(id: string, dto: UpdateResearcherDto): Promise<UpdateResult> {
    const researcher = await this.repository.findOne({
      where: { id },
      relations: { organization: true },
    });

    if (!researcher) {
      throw new NotFoundException(exceptionMessages.notFound);
    }

    let { organization, password } = researcher;

    if (dto.organization) {
      organization = await this.organizationsService.findById(dto.organization);

      if (!organization) {
        throw new BadRequestException(exceptionMessages.badRequestUuid);
      }
    }

    if (dto.password) {
      password = await argon2.hash(dto.password);
    }

    return this.repository.update(id, { ...dto, organization, password });
  }

  async remove(id: string): Promise<void> {
    const researcher = await this.repository.findOneBy({ id });

    if (!researcher) {
      throw new NotFoundException(exceptionMessages.notFound);
    }

    await this.repository.delete(id);
  }
}
