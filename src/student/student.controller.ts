import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentDto } from './student.dto';
import { ValidationPipe } from '../shared/validate.pipe';
import { Observable, of } from 'rxjs';
import { FileInterceptor } from '@nestjs/platform-express';
import { v4 as uuidv4 } from 'uuid';
import { diskStorage } from 'multer';
import * as path from 'path';

export const UploadFileInterceptor = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const filename: string = path
        .parse(file.originalname)
        .name.replace(/\s/g, '');
      const extension: string = path.parse(file.originalname).ext;
      const size: string = path.parse(file.originalname).root;
      if (!file) {
        return cb(
          new HttpException(
            'Image File is not uploaded!',
            HttpStatus.BAD_REQUEST,
          ),
          'false',
        );
      }
      if (extension === '.jpg' || extension === '.png')
        cb(null, `${filename}${extension}`);
      else if (extension !== '.jpg' && extension != '.png') {
        return cb(
          new HttpException(
            'Only jpg or png image files are allowed!',
            HttpStatus.BAD_REQUEST,
          ),
          'false',
        );
      }
    },
  }),
};

@Controller('student')
export class StudentController {
  constructor(private studentService: StudentService) {}
  @Get()
  showAllCourses() {
    return this.studentService.showAll();
  }

  @Get(':id')
  getOneCourse(@Param('id') id: string) {
    return this.studentService.read(id);
  }
  @Put(':id')
  @UsePipes(new ValidationPipe())
  updateCourse(@Param('id') id: string, @Body() data: Partial<StudentDto>) {
    return this.studentService.update(id, data);
  }
  @Delete(':id')
  deleteCourse(@Param('id') id: string) {
    return this.studentService.delete(id);
  }
  @Post()
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('file', UploadFileInterceptor))
  uploadFile(@UploadedFile() file, @Body() body: StudentDto): any {
    if (!file) {
      return {
        status: HttpStatus.BAD_REQUEST,
        timestamp: new Date().toLocaleDateString(),
        message: 'Image file is not uploaded',
      };
    } else if (file) {
      const twoMB = 2000000; ///bytes
      if (file.size > twoMB) {
        return {
          status: HttpStatus.BAD_REQUEST,
          timestamp: new Date().toLocaleDateString(),
          message: 'File size should not exceed 2mb',
        };
      }
      body.image = file.filename;
      body.directory_path = file.path;
    }
    return this.studentService.create(body);
  }
}
