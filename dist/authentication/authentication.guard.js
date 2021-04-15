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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationGuard = void 0;
const common_1 = require("@nestjs/common");
const authentication_service_1 = require("./authentication.service");
let AuthenticationGuard = class AuthenticationGuard {
    constructor(authenticationService) {
        this.authenticationService = authenticationService;
    }
    async canActivate(context) {
        console.log('guard called');
        const request = context.switchToHttp().getRequest();
        const body = request.body;
        if (body) {
            try {
                const data = await this.authenticationService.registration(body);
                return data;
            }
            catch (err) {
                throw new common_1.HttpException(err.message, common_1.HttpStatus.UNAUTHORIZED);
            }
        }
        const header = request.header('Authorization');
        if (!header) {
            throw new common_1.HttpException('Authorization: Bearer <token> header missing', common_1.HttpStatus.UNAUTHORIZED);
        }
        const parts = header.split(' ');
        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            throw new common_1.HttpException('Authorization: Bearer <token> header invalid', common_1.HttpStatus.UNAUTHORIZED);
        }
        const token = parts[1];
        try {
            const data = await this.authenticationService.authenticate(token, body);
            console.log(data);
            return data;
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.UNAUTHORIZED);
        }
    }
};
AuthenticationGuard = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [authentication_service_1.AuthenticationService])
], AuthenticationGuard);
exports.AuthenticationGuard = AuthenticationGuard;
//# sourceMappingURL=authentication.guard.js.map