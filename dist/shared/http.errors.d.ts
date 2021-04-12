import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';
export declare class HttpErrors implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): void;
}
