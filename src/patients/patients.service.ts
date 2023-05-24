import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { ResearchersService } from '@/researchers/researchers.service';
import { PatientEntity } from './entities/patient.entity';
import { exceptionBadRequestUuid, exceptionNotFound } from '@/exceptions';

const exceptionMessages = {
  notFound: exceptionNotFound('Patient'),
  badRequestUuid: exceptionBadRequestUuid('Researcher'),
};

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(PatientEntity) private repository: Repository<PatientEntity>,
    private researchersService: ResearchersService,
  ) {}

  async findAll(id: string): Promise<PatientEntity[]> {
    return this.repository.find({
      where: { researcher: { id } },
      relations: { researcher: true },
    });
  }

  async findById(id: string): Promise<PatientEntity> {
    const patient = await this.repository.findOne({
      where: { id },
      relations: { researcher: true, results: true },
    });

    if (!patient) {
      throw new NotFoundException(exceptionMessages.notFound);
    }

    return patient;
  }

  async create(dto: CreatePatientDto): Promise<PatientEntity> {
    const researcher = await this.researchersService.findById(dto.researcher);

    if (!researcher) {
      throw new BadRequestException(exceptionMessages.badRequestUuid);
    }

    return this.repository.save({ ...dto, researcher });
  }

  async update(id: string, dto: UpdatePatientDto): Promise<UpdateResult> {
    const patient = await this.repository.findOne({
      where: { id },
      relations: { researcher: true },
    });

    if (!patient) {
      throw new NotFoundException(exceptionMessages.notFound);
    }

    let { researcher } = patient;

    if (dto.researcher) {
      researcher = await this.researchersService.findById(dto.researcher);

      if (!researcher) {
        throw new BadRequestException(exceptionMessages.badRequestUuid);
      }
    }

    return this.repository.update(id, { ...dto, researcher });
  }

  async remove(id: string): Promise<void> {
    const patient = await this.repository.findOneBy({ id });

    if (!patient) {
      throw new NotFoundException(exceptionMessages.notFound);
    }

    await this.repository.delete(id);
  }
}
