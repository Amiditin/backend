import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';

import { ResultEntity } from './entities/result.entity';
import { PatientsService } from '@/patients/patients.service';
import { exceptionNotFound, exceptionBadRequestUuid } from '@/exceptions/index';

const exceptionMessages = {
  notFound: exceptionNotFound('Result'),
  badRequestUuid: exceptionBadRequestUuid('Patient'),
};

@Injectable()
export class ResultsService {
  constructor(
    @InjectRepository(ResultEntity) private repository: Repository<ResultEntity>,
    private patientsService: PatientsService,
  ) {}

  async findAll(): Promise<ResultEntity[]> {
    return this.repository.find({ relations: { patient: true } });
  }

  async findById(id: string): Promise<ResultEntity> {
    const result = await this.repository.findOne({
      where: { id },
      relations: { patient: true },
    });

    if (!result) {
      throw new NotFoundException(exceptionMessages.notFound);
    }

    return result;
  }

  async create(dto: CreateResultDto): Promise<ResultEntity> {
    const patient = await this.patientsService.findById(dto.patient);

    if (!patient) {
      throw new BadRequestException(exceptionMessages.badRequestUuid);
    }

    return this.repository.save({ ...dto, patient });
  }

  async update(id: string, dto: UpdateResultDto): Promise<UpdateResult> {
    const result = await this.repository.findOne({
      where: { id },
      relations: { patient: true },
    });

    if (!result) {
      throw new NotFoundException(exceptionMessages.notFound);
    }

    let { patient } = result;

    if (dto.patient) {
      patient = await this.patientsService.findById(dto.patient);

      if (!patient) {
        throw new BadRequestException(exceptionMessages.badRequestUuid);
      }
    }

    return this.repository.update(id, { ...dto, patient });
  }

  async remove(id: string): Promise<void> {
    const result = await this.repository.findOneBy({ id });

    if (!result) {
      throw new NotFoundException(exceptionMessages.notFound);
    }

    await this.repository.delete(id);
  }
}
