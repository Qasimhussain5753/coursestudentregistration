import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Register } from './register.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from './register.dto';
import { Courses } from '../courses/course.entity';
import { filter } from 'rxjs/operators';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(Register)
    private registoryRepository: Repository<Register>,
    @InjectRepository(Courses)
    private courseRepository: Repository<Courses>,
  ) {}

  async showAll() {
    return await this.registoryRepository.find();
  }

  async create(data: RegisterDto) {
    const { studentID, courseID } = data;
    const register = await this.registoryRepository.find();
    const course = await this.courseRepository.find();
    const studentLimit = register.filter(
      (item) => item.studentID === studentID,
    );

    for (const key in course) {
      const courseLimit = register.filter((item) => item.courseID === courseID);
      if (course[key].id === courseID) {
        if (courseLimit.length > course[key].studentlimits) {
          const data = {
            ...course[key],
            message: 'Student Limit is reached',
          };
          return data;
        }
      }
    }
    if (studentLimit.length > 5) {
      throw new ConflictException('student can register only 6 courses');
    } else {
      if (studentLimit.find((item) => item.courseID === courseID)) {
        throw new ConflictException(
          'Student can not register same course more than twice!',
        );
      } else {
        const registerCourses = await this.registoryRepository.create(data);
        await this.registoryRepository.save(registerCourses);
        return {
          message: 'Register Successfully',
          data: registerCourses,
        };
      }
    }
  }

  async update(id: string, data: Partial<RegisterDto>) {
    try {
      const registerCourse = this.registoryRepository.findOne({
        where: { id },
      });
      if (!registerCourse) {
        throw new HttpException('Data not found', HttpStatus.NOT_FOUND);
      } else if (registerCourse) {
        await this.registoryRepository.update(id, data);
        const response = await this.registoryRepository.findOne(id);
        return {
          message: 'Data updated Successfully!',
          data: response,
        };
      }
    } catch (err) {
      console.log(err);
    }
  }

  async delete(id: string) {
  const registerCourse =await this.registoryRepository.findOne({ where: { id } });
    if (!registerCourse) {
      throw new HttpException('Data not found', HttpStatus.NOT_FOUND);
    } else if (registerCourse) {
      const deleteData = await this.registoryRepository.delete(id);
      return {
        message: 'Data deleted successfully',
        data: registerCourse,
      };
    }
  }

  async read(id: string) {
    const registerCourse = this.registoryRepository.findOne(id);
    if (!registerCourse) {
      throw new HttpException('Data not Found', HttpStatus.NOT_FOUND);
    }
    return registerCourse;
  }
}
