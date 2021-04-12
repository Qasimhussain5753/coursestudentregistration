"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const register_entity_1 = require("./register.entity");
const typeorm_2 = require("@nestjs/typeorm");
const course_entity_1 = require("../courses/course.entity");
let RegisterService = class RegisterService {
    constructor(registoryRepository, courseRepository) {
        this.registoryRepository = registoryRepository;
        this.courseRepository = courseRepository;
    }
    async showAll() {
        return await this.registoryRepository.find();
    }
    async create(data) {
        const { studentID, courseID } = data;
        const register = await this.registoryRepository.find();
        const course = await this.courseRepository.find();
        const studentLimit = register.filter((item) => item.studentID === studentID);
        for (const key in course) {
            const courseLimit = register.filter((item) => item.courseID === courseID);
            if (course[key].id === courseID) {
                if (courseLimit.length > course[key].studentlimits) {
                    const data = Object.assign(Object.assign({}, course[key]), { message: 'Student Limit is reached' });
                    return data;
                }
            }
        }
        if (studentLimit.length > 5) {
            throw new common_1.ConflictException('student can register only 6 courses');
        }
        else {
            if (studentLimit.find((item) => item.courseID === courseID)) {
                throw new common_1.ConflictException('Student can not register same course more than twice!');
            }
            else {
                const registerCourses = await this.registoryRepository.create(data);
                await this.registoryRepository.save(registerCourses);
                return {
                    message: 'Register Successfully',
                    data: registerCourses,
                };
            }
        }
    }
    async update(id, data) {
        try {
            const registerCourse = this.registoryRepository.findOne({
                where: { id },
            });
            if (!registerCourse) {
                throw new common_1.HttpException('Data not found', common_1.HttpStatus.NOT_FOUND);
            }
            else if (registerCourse) {
                await this.registoryRepository.update(id, data);
                const response = await this.registoryRepository.findOne(id);
                return {
                    message: 'Data updated Successfully!',
                    data: response,
                };
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    async delete(id) {
        const registerCourse = await this.registoryRepository.findOne({ where: { id } });
        if (!registerCourse) {
            throw new common_1.HttpException('Data not found', common_1.HttpStatus.NOT_FOUND);
        }
        else if (registerCourse) {
            const deleteData = await this.registoryRepository.delete(id);
            return {
                message: 'Data deleted successfully',
                data: registerCourse,
            };
        }
    }
    async read(id) {
        const registerCourse = this.registoryRepository.findOne(id);
        if (!registerCourse) {
            throw new common_1.HttpException('Data not Found', common_1.HttpStatus.NOT_FOUND);
        }
        return registerCourse;
    }
};
RegisterService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(register_entity_1.Register)),
    __param(1, typeorm_2.InjectRepository(course_entity_1.Courses)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], RegisterService);
exports.RegisterService = RegisterService;
//# sourceMappingURL=register.service.js.map