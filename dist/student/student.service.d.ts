import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { StudentDto } from './student.dto';
export declare class StudentService {
    private studentRepository;
    constructor(studentRepository: Repository<Student>);
    showAll(): Promise<Student[]>;
    create(data: StudentDto): Promise<{
        message: string;
        data: Student;
    }>;
    read(id: string): Promise<Student>;
    update(id: string, data: Partial<StudentDto>): Promise<{
        message: string;
        data: Student;
    }>;
    delete(id: string): Promise<{
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
