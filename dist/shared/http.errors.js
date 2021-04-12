"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpErrors = void 0;
const common_1 = require("@nestjs/common");
let HttpErrors = class HttpErrors {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();
        if (Object.values(exception).indexOf('NotFoundException') > -1) {
            const status = exception.getStatus();
            const errorResponse = {
                code: status,
                timestamp: new Date().toLocaleDateString(),
                path: request.url,
                method: request.method,
                message: exception.message || null,
            };
            response.status(400).json(errorResponse);
        }
        else {
            const errorResponse = {
                timestamp: new Date().toLocaleDateString(),
                path: request.url,
                method: request.method,
                message: `${exception.message}` || null,
            };
            response.status(400).json(errorResponse);
        }
    }
};
HttpErrors = __decorate([
    common_1.Catch()
], HttpErrors);
exports.HttpErrors = HttpErrors;
//# sourceMappingURL=http.errors.js.map