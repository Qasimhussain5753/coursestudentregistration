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
exports.StudentController = exports.UploadFileInterceptor = void 0;
const common_1 = require("@nestjs/common");
const student_service_1 = require("./student.service");
const student_dto_1 = require("./student.dto");
const validate_pipe_1 = require("../shared/validate.pipe");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path = require("path");
exports.UploadFileInterceptor = {
    storage: multer_1.diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
            const filename = path
                .parse(file.originalname)
                .name.replace(/\s/g, '');
            const extension = path.parse(file.originalname).ext;
            const size = path.parse(file.originalname).root;
            if (!file) {
                return cb(new common_1.HttpException('Image File is not uploaded!', common_1.HttpStatus.BAD_REQUEST), 'false');
            }
            if (extension === '.jpg' || extension === '.png')
                cb(null, `${filename}${extension}`);
            else if (extension !== '.jpg' && extension != '.png') {
                return cb(new common_1.HttpException('Only jpg or png image files are allowed!', common_1.HttpStatus.BAD_REQUEST), 'false');
            }
        },
    }),
};
let StudentController = class StudentController {
    constructor(studentService) {
        this.studentService = studentService;
    }
    showAllCourses() {
        return this.studentService.showAll();
    }
    getOneCourse(id) {
        return this.studentService.read(id);
    }
    updateCourse(id, data) {
        return this.studentService.update(id, data);
    }
    deleteCourse(id) {
        return this.studentService.delete(id);
    }
    uploadFile(file, body) {
        if (!file) {
            return {
                status: common_1.HttpStatus.BAD_REQUEST,
                timestamp: new Date().toLocaleDateString(),
                message: 'Image file is not uploaded',
            };
        }
        else if (file) {
            const twoMB = 2000000;
            if (file.size > twoMB) {
                return {
                    status: common_1.HttpStatus.BAD_REQUEST,
                    timestamp: new Date().toLocaleDateString(),
                    message: 'File size should not exceed 2mb',
                };
            }
            body.image = file.filename;
            body.directory_path = file.path;
        }
        return this.studentService.create(body);
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StudentController.prototype, "showAllCourses", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StudentController.prototype, "getOneCourse", null);
__decorate([
    common_1.Put(':id'),
    common_1.UsePipes(new validate_pipe_1.ValidationPipe()),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], StudentController.prototype, "updateCourse", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StudentController.prototype, "deleteCourse", null);
__decorate([
    common_1.Post(),
    common_1.UsePipes(new validate_pipe_1.ValidationPipe()),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('file', exports.UploadFileInterceptor)),
    __param(0, common_1.UploadedFile()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, student_dto_1.StudentDto]),
    __metadata("design:returntype", Object)
], StudentController.prototype, "uploadFile", null);
StudentController = __decorate([
    common_1.Controller('student'),
    __metadata("design:paramtypes", [student_service_1.StudentService])
], StudentController);
exports.StudentController = StudentController;
//# sourceMappingURL=student.controller.js.map