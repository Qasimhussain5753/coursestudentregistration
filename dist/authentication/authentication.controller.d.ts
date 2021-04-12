import { HttpService } from '@nestjs/common';
export declare class AuthenticationController {
    private readonly httpService;
    constructor(httpService: HttpService);
    getHello(req: any): Promise<string>;
    registerUser(): string;
}
