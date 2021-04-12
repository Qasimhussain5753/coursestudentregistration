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
exports.AuthenticationController = void 0;
const common_1 = require("@nestjs/common");
const authentication_guard_1 = require("./authentication.guard");
let AuthenticationController = class AuthenticationController {
    constructor(httpService) {
        this.httpService = httpService;
    }
    async getHello(req) {
        return 'loging successfully';
    }
    registerUser() {
        return 'register successfully';
    }
};
__decorate([
    common_1.Get('/login'),
    common_1.UseGuards(authentication_guard_1.AuthenticationGuard),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "getHello", null);
__decorate([
    common_1.Post('/register'),
    common_1.UseGuards(authentication_guard_1.AuthenticationGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AuthenticationController.prototype, "registerUser", null);
AuthenticationController = __decorate([
    common_1.Controller('/authentication'),
    __metadata("design:paramtypes", [common_1.HttpService])
], AuthenticationController);
exports.AuthenticationController = AuthenticationController;
//# sourceMappingURL=authentication.controller.js.map