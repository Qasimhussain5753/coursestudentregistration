import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Optional } from '@nestjs/common';

@Entity('register')
export class Register {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  studentID: number;
  @Column()
  courseID: number;
}
