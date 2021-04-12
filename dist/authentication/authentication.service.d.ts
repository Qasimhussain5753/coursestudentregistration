import { HttpService } from '@nestjs/common';
export declare class AuthenticationError extends Error {
}
export declare class AuthenticationService {
    private httpService;
    private readonly baseURL;
    private readonly realm;
    constructor(httpService: HttpService);
    authenticate(accessToken: string, body: any): Promise<any>;
    registration(body: any): Promise<any>;
}
