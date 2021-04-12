import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity('courses')
@Unique(['course_name'])
export class Courses {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 100, nullable: false })
  course_name: string;
  @Column({ type: 'numeric' })
  studentlimits: number;
}
