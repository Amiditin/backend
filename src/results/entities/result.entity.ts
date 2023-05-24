import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { PatientEntity } from '@/patients/entities/patient.entity';

@Entity('result')
export class ResultEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  dateStart: Date;

  @Column()
  dateEnd: Date;

  @Column({ nullable: true, default: null })
  dateCompleted: Date | null;

  @Column({ nullable: true, default: null })
  time1: string | null;

  @Column({ nullable: true, default: null })
  time2: string | null;

  @Column({ nullable: true, default: null })
  time3: string | null;

  @Column({ nullable: true, default: null })
  time4: string | null;

  @ManyToOne(() => PatientEntity, (patients) => patients.results)
  @JoinColumn()
  patient: PatientEntity;
}
