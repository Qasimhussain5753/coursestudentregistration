import { Repository } from 'typeorm';
import { Courses } from './course.entity';
import { CoursesDto } from './courses.dto';
export declare class CoursesService {
    private courseRepository;
    constructor(courseRepository: Repository<Courses>);
    showAll(): Promise<Courses[]>;
    create(data: CoursesDto): Promise<{
        message: string;
        id: number;
        course_name: string;
        studentlimits: number;
    }>;
    read(id: string): Promise<Courses>;
    update(id: string, data: Partial<CoursesDto>): Promise<{
        message: string;
        id: number;
        course_name: string;
        studentlimits: number;
    }>;
    delete(id: string): Promise<{
        message: string;
        id: number;
        course_name: string;
        studentlimits: number;
    }>;
}
