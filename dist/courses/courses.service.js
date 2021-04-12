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
exports.CoursesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const course_entity_1 = require("./course.entity");
const typeorm_2 = require("@nestjs/typeorm");
let CoursesService = class CoursesService {
    constructor(courseRepository) {
        this.courseRepository = courseRepository;
    }
    async showAll() {
        console.log(process.env.DATABASE_DB, process.env.DATABASE_PASSWORD, process.env.database_host);
        return await this.courseRepository.find();
    }
    async create(data) {
        try {
            const course = await this.courseRepository.create(data);
            const saveCourse = await this.courseRepository.save(course);
            if (saveCourse) {
                const data = Object.assign(Object.assign({}, course), { message: 'Data created successfully' });
                return data;
            }
        }
        catch (error) {
            console.log('errors', error);
            if (error.code === '23505') {
                throw new common_1.ConflictException('course_name should not be duplicate ' + error.detail);
            }
            else {
                throw new common_1.InternalServerErrorException();
            }
        }
    }
    async read(id) {
        const course = await this.courseRepository.findOne({ where: { id: id } });
        if (!course) {
            throw new common_1.HttpException('NOT FOUND', common_1.HttpStatus.NOT_FOUND);
        }
        return course;
    }
    async update(id, data) {
        try {
            const course = await this.courseRepository.findOne({ where: { id } });
            if (!course) {
                throw new common_1.HttpException('NOT FOUND', common_1.HttpStatus.NOT_FOUND);
            }
            else if (course) {
                await this.courseRepository.update(id, data);
                const courseData = await this.courseRepository.findOne(id);
                const response = Object.assign(Object.assign({}, courseData), { message: 'Data updated sucessfully' });
                return response;
            }
        }
        catch (err) {
            if (err.code === '23505') {
                throw new common_1.ConflictException('Data already found');
            }
            else {
                throw new common_1.InternalServerErrorException();
            }
        }
    }
    async delete(id) {
        const course = await this.courseRepository.findOne({ where: { id } });
        if (!course) {
            throw new common_1.HttpException('NOT FOUND', common_1.HttpStatus.NOT_FOUND);
        }
        else if (course) {
            await this.courseRepository.delete(id);
            const data = Object.assign(Object.assign({}, course), { message: 'Data deleted successfully' });
            return data;
        }
    }
};
CoursesService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(course_entity_1.Courses)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], CoursesService);
exports.CoursesService = CoursesService;
//# sourceMappingURL=courses.service.js.map