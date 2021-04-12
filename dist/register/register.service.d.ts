import { Repository } from 'typeorm';
import { Register } from './register.entity';
import { RegisterDto } from './register.dto';
import { Courses } from '../courses/course.entity';
export declare class RegisterService {
    private registoryRepository;
    private courseRepository;
    constructor(registoryRepository: Repository<Register>, courseRepository: Repository<Courses>);
    showAll(): Promise<Register[]>;
    create(data: RegisterDto): Promise<{
        message: string;
        id: number;
        course_name: string;
        studentlimits: number;
    } | {
        message: string;
        data: Register;
    }>;
    update(id: string, data: Partial<RegisterDto>): Promise<{
        message: string;
        data: Register;
    }>;
    delete(id: string): Promise<{
        message: string;
        data: Register;
    }>;
    read(id: string): Promise<Register>;
}
