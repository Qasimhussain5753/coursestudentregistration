import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesDto } from './courses.dto';
import { ValidationPipe } from '../shared/validate.pipe';
import { AllowAnyRole, Roles } from 'nest-keycloak-connect';
@Controller('courses')
export class CoursesController {
  constructor(private coursesService: CoursesService) {}
  @Get()
  @Roles('user')
  showAllCourses() {
    return this.coursesService.showAll();
  }

  @Post()
  @Roles('user')
  @UsePipes(new ValidationPipe())
  createCourse(@Body() data: CoursesDto) {
    return this.coursesService.create(data);
  }

  @Get(':id')
  getOneCourse(@Param('id') id: string) {
    return this.coursesService.read(id);
  }
  @Put(':id')
  @UsePipes(new ValidationPipe())
  updateCourse(@Param('id') id: string, @Body() data: Partial<CoursesDto>) {
    return this.coursesService.update(id, data);
  }
  @Delete(':id')
  deleteCourse(@Param('id') id: string) {
    return this.coursesService.delete(id);
  }
}
