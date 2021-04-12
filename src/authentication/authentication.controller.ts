// import { Controller } from '@nestjs/common';
//
// @Controller('authentication')
// export class AuthenticationController {}
import {
  Controller,
  Get,
  HttpService,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthenticationGuard } from './authentication.guard';

@Controller('/authentication')
export class AuthenticationController {
  constructor(private readonly httpService: HttpService) {}

  @Get('/login')
  @UseGuards(AuthenticationGuard)
  async getHello(@Request() req): Promise<string> {
    return 'loging successfully';
  }
  @Post('/register')
  @UseGuards(AuthenticationGuard)
  registerUser(): string {
    return 'register successfully';
  }
}
