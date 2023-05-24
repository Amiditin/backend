import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ResearcherEntity } from '@/researchers/entities/researcher.entity';

@Entity('organization')
export class OrganizationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  name: string;

  @Column({ nullable: true })
  abbreviation: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  contact: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  website: string;

  @OneToMany(() => ResearcherEntity, (researcher) => researcher.organization)
  researchers: ResearcherEntity[];
}
