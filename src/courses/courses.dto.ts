import { IsString, IsNumber, Length, IsEmail } from 'class-validator';
import { Unique } from 'typeorm';

export class CoursesDto {
  id: number;
  @IsString()
  course_name: string;
  @IsNumber()
  studentlimits: number;
}
