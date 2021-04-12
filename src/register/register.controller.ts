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
import { RegisterService } from './register.service';
import { RegisterDto } from './register.dto';
import { Register } from './register.entity';
import { ValidationPipe } from '../shared/validate.pipe';
import { CoursesDto } from '../courses/courses.dto';

@Controller('register')
export class RegisterController {
  constructor(private registerService: RegisterService) {}
  @Get()
  getAllRegisterCourse() {
    return this.registerService.showAll();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createRegisterCourse(@Body() body: RegisterDto) {
    return this.registerService.create(body);
  }
  @Put(':id')
  @UsePipes(new ValidationPipe())
  updateRegisterCourse(
    @Param('id') id: string,
    @Body() data: Partial<RegisterDto>,
  ) {
    return this.registerService.update(id, data);
  }
  @Delete(':id')
  @UsePipes(new ValidationPipe())
  delete(@Param('id') id: string) {
    return this.registerService.delete(id);
  }
}
