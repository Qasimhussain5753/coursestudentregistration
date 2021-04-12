"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterModule = void 0;
const common_1 = require("@nestjs/common");
const register_controller_1 = require("./register.controller");
const register_service_1 = require("./register.service");
const typeorm_1 = require("@nestjs/typeorm");
const register_entity_1 = require("./register.entity");
const course_entity_1 = require("../courses/course.entity");
const courses_controller_1 = require("../courses/courses.controller");
const courses_service_1 = require("../courses/courses.service");
let RegisterModule = class RegisterModule {
};
RegisterModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([register_entity_1.Register, course_entity_1.Courses])],
        controllers: [register_controller_1.RegisterController, courses_controller_1.CoursesController],
        providers: [register_service_1.RegisterService, courses_service_1.CoursesService],
    })
], RegisterModule);
exports.RegisterModule = RegisterModule;
//# sourceMappingURL=register.module.js.map