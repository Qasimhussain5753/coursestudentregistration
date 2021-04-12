import { Module } from '@nestjs/common';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Register } from './register.entity';
import { Courses } from '../courses/course.entity';
import { CoursesController } from '../courses/courses.controller';
import { CoursesService } from '../courses/courses.service';

@Module({
  imports: [TypeOrmModule.forFeature([Register, Courses])],
  controllers: [RegisterController, CoursesController],
  providers: [RegisterService, CoursesService],
})
export class RegisterModule {}
