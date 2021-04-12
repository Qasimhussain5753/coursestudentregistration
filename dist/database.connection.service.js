"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConnectionService = void 0;
require("dotenv/config");
const common_1 = require("@nestjs/common");
let DatabaseConnectionService = class DatabaseConnectionService {
    createTypeOrmOptions() {
        console.log(process.env.DATABASE_HOST, process.env.DATABASE_PORT, process.env.database_user, process.env.DATABASE_PASSWORD, process.env.DATABASE_DB);
        return {
            name: 'default',
            type: 'postgres',
            host: process.env.DATABASE_HOST,
            port: Number(process.env.DATABASE_PORT),
            username: process.env.database_user,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_DB,
            synchronize: true,
            dropSchema: false,
            logging: true,
            entities: ['dist/**/*.entity.js'],
        };
    }
};
DatabaseConnectionService = __decorate([
    common_1.Injectable()
], DatabaseConnectionService);
exports.DatabaseConnectionService = DatabaseConnectionService;
//# sourceMappingURL=database.connection.service.js.map