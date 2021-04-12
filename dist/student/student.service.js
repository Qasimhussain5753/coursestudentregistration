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
exports.StudentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const student_entity_1 = require("./student.entity");
const typeorm_2 = require("@nestjs/typeorm");
let StudentService = class StudentService {
    constructor(studentRepository) {
        this.studentRepository = studentRepository;
    }
    async showAll() {
        return await this.studentRepository.find();
    }
    async create(data) {
        try {
            const student = await this.studentRepository.create(data);
            const res = await this.studentRepository.save(student);
            if (res) {
                return {
                    message: 'Data Added successfully!',
                    data: student,
                };
            }
        }
        catch (err) {
            if (err.code === '23505') {
                throw new common_1.ConflictException(err.detail);
            }
            else {
                throw new common_1.InternalServerErrorException();
            }
        }
    }
    async read(id) {
        const student = await this.studentRepository.findOne({ where: { id: id } });
        if (!student) {
            throw new common_1.HttpException('NOT FOUND', common_1.HttpStatus.NOT_FOUND);
        }
        return student;
    }
    async update(id, data) {
        try {
            const student = await this.studentRepository.findOne({ where: { id } });
            if (!student) {
                throw new common_1.HttpException('STUDENT NOT FOUND', common_1.HttpStatus.NOT_FOUND);
            }
            const res = await this.studentRepository.update(id, data);
            if (res) {
                const updateData = await this.studentRepository.findOne(id);
                return {
                    message: 'updated successfully',
                    data: updateData,
                };
            }
        }
        catch (err) {
            if (err.status === 404) {
                throw new common_1.HttpException('Not found', common_1.HttpStatus.NOT_FOUND);
            }
            else {
                throw new common_1.InternalServerErrorException();
            }
        }
    }
    async delete(id) {
        const student = await this.studentRepository.findOne({ where: { id } });
        if (!student) {
            throw new common_1.HttpException('STUDENT NOT FOUND', common_1.HttpStatus.NOT_FOUND);
        }
        const deletedData = await this.studentRepository.delete(id);
        if (deletedData) {
            const response = {
                message: 'Deleted Successfully',
                data: Object.assign({}, student),
            };
            return response;
        }
    }
};
StudentService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(student_entity_1.Student)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], StudentService);
exports.StudentService = StudentService;
//# sourceMappingURL=student.service.js.map