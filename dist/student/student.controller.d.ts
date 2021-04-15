/// <reference types="multer" />
import { StudentService } from './student.service';
import { StudentDto } from './student.dto';
export declare const UploadFileInterceptor: {
    storage: import("multer").StorageEngine;
};
export declare class StudentController {
    private studentService;
    constructor(studentService: StudentService);
    showAllCourses(): Promise<import("./student.entity").Student[]>;
    getOneCourse(id: string): Promise<import("./student.entity").Student>;
    updateCourse(id: string, data: Partial<StudentDto>): Promise<{
        message: string;
        data: import("./student.entity").Student;
    }>;
    deleteCourse(id: string): Promise<{
        message: string;
        data: {
            id: number;
            first_name: string;
            last_name: string;
            user_name: string;
            email: string;
            password: string;
            address: string;
            phone: string;
            image: string;
            directory_path: string;
        };
    }>;
    uploadFile(file: any, body: StudentDto): any;
    createdStudent(data: any): Promise<{
        message: string;
        data: import("./student.entity").Student;
    }>;
    updateStudent(data: any): Promise<{
        message: string;
        data: import("./student.entity").Student;
    }>;
    deleteStudent(data: any): Promise<{
        message: string;
        data: {
            id: number;
            first_name: string;
            last_name: string;
            user_name: string;
            email: string;
            password: string;
            address: string;
            phone: string;
            image: string;
            directory_path: string;
        };
    }>;
}
