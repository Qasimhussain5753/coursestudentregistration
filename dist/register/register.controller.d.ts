import { RegisterService } from './register.service';
import { RegisterDto } from './register.dto';
import { Register } from './register.entity';
export declare class RegisterController {
    private registerService;
    constructor(registerService: RegisterService);
    getAllRegisterCourse(): Promise<Register[]>;
    createRegisterCourse(body: RegisterDto): Promise<{
        message: string;
        id: number;
        course_name: string;
        studentlimits: number;
    } | {
        message: string;
        data: Register;
    }>;
    updateRegisterCourse(id: string, data: Partial<RegisterDto>): Promise<{
        message: string;
        data: Register;
    }>;
    delete(id: string): Promise<{
        message: string;
        data: Register;
    }>;
}
