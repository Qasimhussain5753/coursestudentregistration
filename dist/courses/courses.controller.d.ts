import { CoursesService } from './courses.service';
import { CoursesDto } from './courses.dto';
export declare class CoursesController {
    private coursesService;
    constructor(coursesService: CoursesService);
    showAllCourses(): Promise<import("./course.entity").Courses[]>;
    createCourse(data: CoursesDto): Promise<{
        message: string;
        id: number;
        course_name: string;
        studentlimits: number;
    }>;
    getOneCourse(id: string): Promise<import("./course.entity").Courses>;
    updateCourse(id: string, data: Partial<CoursesDto>): Promise<{
        message: string;
        id: number;
        course_name: string;
        studentlimits: number;
    }>;
    deleteCourse(id: string): Promise<{
        message: string;
        id: number;
        course_name: string;
        studentlimits: number;
    }>;
}
