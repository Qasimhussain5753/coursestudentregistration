import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';

import { AuthenticationService } from './authentication.service';
import { Request } from 'express';
import { User } from './user.modal';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private readonly authenticationService: AuthenticationService) {}

  /**
   *
   * @param context
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('guard called');
    const request: Request = context.switchToHttp().getRequest();
    const body = request.body;
    if (body) {
      try {
        const data = await this.authenticationService.registration(body);
        return data;
      } catch (err) {
        throw new HttpException(err.message, HttpStatus.UNAUTHORIZED);
      }
    }
    const header = request.header('Authorization');
    if (!header) {
      throw new HttpException(
        'Authorization: Bearer <token> header missing',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const parts = header.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      throw new HttpException(
        'Authorization: Bearer <token> header invalid',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = parts[1];

    try {
      // Store the user on the request object if we want to retrieve it from the controllers
      const data = await this.authenticationService.authenticate(token, body);
      console.log(data);
      return data;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.UNAUTHORIZED);
    }
  }
}
