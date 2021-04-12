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
exports.AuthenticationService = exports.AuthenticationError = void 0;
const common_1 = require("@nestjs/common");
const qs = require('querystring');
class AuthenticationError extends Error {
}
exports.AuthenticationError = AuthenticationError;
let AuthenticationService = class AuthenticationService {
    constructor(httpService) {
        this.httpService = httpService;
        this.baseURL = process.env.KEYCLOAK_BASE_URL;
        this.realm = process.env.KEYCLOAK_REALM;
    }
    async authenticate(accessToken, body) {
        const url = `${process.env.KEYCLOAK_BASE_URL}/auth/admin/realms/${process.env.KEYCLOAK_REALM}/users`;
        try {
            const response = await this.httpService
                .get(url, {
                headers: {
                    authorization: `Bearer ${accessToken}`,
                },
            })
                .toPromise();
            console.log('response dta ', response.data);
            return response.data;
        }
        catch (e) {
            throw new AuthenticationError(e.message);
        }
    }
    async registration(body) {
        console.log('registration called', body);
        const formBody = [];
        for (const property in body) {
            const encodedKey = encodeURIComponent(property);
            const encodedValue = encodeURIComponent(body[property]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        const data = formBody.join('&');
        console.log('form body', formBody);
        console.log('form data', data);
        const url = `${process.env.KEYCLOAK_BASE_URL}/auth/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/token`;
        try {
            const response = await this.httpService
                .post(url, qs.stringify(body), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                },
            })
                .toPromise();
            console.log('response data ', response.data);
            return response.data;
        }
        catch (err) {
            throw new AuthenticationError(err.message);
        }
    }
};
AuthenticationService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [common_1.HttpService])
], AuthenticationService);
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map