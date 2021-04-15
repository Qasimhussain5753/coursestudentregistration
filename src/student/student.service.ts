import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentDto } from './student.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  async showAll() {
    return await this.studentRepository.find();
  }
  async createStudentData(data: StudentDto) {
    const student = await this.studentRepository.create(data);
    const res = await this.studentRepository.save(student);
  }
  async create(data: StudentDto) {
    try {
      const student = await this.studentRepository.create(data);
      const res = await this.studentRepository.save(student);
      if (res) {
        return {
          message: 'Data Added successfully!',
          data: student,
        };
      }
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException(err.detail);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async read(id: string) {
    const student = await this.studentRepository.findOne({ where: { id: id } });
    if (!student) {
      throw new HttpException('NOT FOUND', HttpStatus.NOT_FOUND);
    }
    return student;
  }

  async update(id: string, data: Partial<StudentDto>) {
    try {
      const student = await this.studentRepository.findOne({ where: { id } });
      if (!student) {
        throw new HttpException('STUDENT NOT FOUND', HttpStatus.NOT_FOUND);
      }
      const res = await this.studentRepository.update(id, data);
      if (res) {
        const updateData = await this.studentRepository.findOne(id);
        return {
          message: 'updated successfully',
          data: updateData,
        };
      }
    } catch (err) {
      if (err.status === 404) {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
  async delete(id: string) {
    const student = await this.studentRepository.findOne({ where: { id } });
    if (!student) {
      throw new HttpException('STUDENT NOT FOUND', HttpStatus.NOT_FOUND);
    }
    const deletedData = await this.studentRepository.delete(id);
    if (deletedData) {
      const response = {
        message: 'Deleted Successfully',
        data: {
          ...student,
        },
      };
      return response;
    }
  }
}
