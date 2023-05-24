import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { EEducationTypes, EGenderTypes } from '../patients.types';
import { ResearcherEntity } from '@/researchers/entities/researcher.entity';
import { ResultEntity } from '@/results/entities/result.entity';

@Entity('patient')
export class PatientEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  fullname: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  gender: EGenderTypes;

  @Column()
  education: EEducationTypes;

  @Column()
  sport: string;

  @Column()
  dateBirth: Date;

  @Column({ default: null, nullable: true })
  dateLastTest: Date;

  @ManyToOne(() => ResearcherEntity, (researchers) => researchers.organization)
  @JoinColumn()
  researcher: ResearcherEntity;

  @OneToMany(() => ResultEntity, (results) => results.patient)
  results: ResultEntity[];
}
