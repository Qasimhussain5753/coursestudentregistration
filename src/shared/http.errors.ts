import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch()
export class HttpErrors implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
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
    } else {
      const errorResponse = {
        timestamp: new Date().toLocaleDateString(),
        path: request.url,
        method: request.method,
        message: `${exception.message}` || null,
      };
      response.status(400).json(errorResponse);
    }
  }
}
