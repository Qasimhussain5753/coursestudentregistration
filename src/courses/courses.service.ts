import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Courses } from './course.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CoursesDto } from './courses.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Courses)
    private courseRepository: Repository<Courses>,
  ) {}

  async showAll() {
    console.log(
      process.env.DATABASE_DB,
      process.env.DATABASE_PASSWORD,
      process.env.database_host,
    );
    return await this.courseRepository.find();
  }

  async create(data: CoursesDto) {
    try {
      const course = await this.courseRepository.create(data);
      const saveCourse = await this.courseRepository.save(course);
      if (saveCourse) {
        const data = {
          ...course,
          message: 'Data created successfully',
        };
        return data;
      }
    } catch (error) {
      console.log('errors', error);
      if (error.code === '23505') {
        throw new ConflictException(
          'course_name should not be duplicate ' + error.detail,
        );
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async read(id: string) {
    const course = await this.courseRepository.findOne({ where: { id: id } });
    if (!course) {
      throw new HttpException('NOT FOUND', HttpStatus.NOT_FOUND);
    }
    return course;
  }

  async update(id: string, data: Partial<CoursesDto>) {
    try {
      const course = await this.courseRepository.findOne({ where: { id } });
      if (!course) {
        throw new HttpException('NOT FOUND', HttpStatus.NOT_FOUND);
      } else if (course) {
        await this.courseRepository.update(id, data);
        const courseData = await this.courseRepository.findOne(id);
        const response = {
          ...courseData,
          message: 'Data updated sucessfully',
        };
        return response;
      }
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('Data already found');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
  async delete(id: string) {
    const course = await this.courseRepository.findOne({ where: { id } });
    if (!course) {
      throw new HttpException('NOT FOUND', HttpStatus.NOT_FOUND);
    } else if (course) {
      await this.courseRepository.delete(id);
      const data = {
        ...course,
        message: 'Data deleted successfully',
      };
      return data;
    }
  }
}
