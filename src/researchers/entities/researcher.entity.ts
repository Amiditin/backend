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

import { OrganizationEntity } from '@/organizations/entities/organization.entity';
import { PatientEntity } from '@/patients/entities/patient.entity';

@Entity('researcher')
export class ResearcherEntity {
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
  password: string;

  @Column()
  phone: string;

  @Column({ default: false })
  isVerified: boolean;

  @ManyToOne(() => OrganizationEntity, (organization) => organization.researchers)
  @JoinColumn()
  organization: OrganizationEntity;

  @OneToMany(() => PatientEntity, (patients) => patients.researcher)
  patients: PatientEntity[];
}
