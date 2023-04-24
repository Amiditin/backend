import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('organization')
export class OrganizationEntity {
  @PrimaryGeneratedColumn()
  id: string;

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
}
