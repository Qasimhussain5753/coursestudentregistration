import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Optional } from '@nestjs/common';

@Entity('student')
@Unique(['user_name'])
@Unique(['email'])
@Unique(['phone'])
export class Student {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 100, nullable: false })
  first_name: string;
  @Column({ type: 'varchar', length: 100, nullable: false })
  last_name: string;
  @Column({ type: 'varchar', length: 100, nullable: false })
  user_name: string;
  @Column({ type: 'varchar', length: 100, nullable: false })
  email: string;
  @Column({ type: 'varchar', length: 100, nullable: false })
  password: string;
  @Column({ type: 'varchar', length: 100, nullable: true })
  @Optional()
  address: string;
  @Column({ type: 'varchar', length: 14, nullable: false })
  phone: string;
  @Column({ type: 'varchar', length: 100, nullable: false })
  image: string;
  @Column({ type: 'varchar', length: 100, nullable: false })
  directory_path: string;
}
