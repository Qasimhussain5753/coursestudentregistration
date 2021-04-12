import { Catch, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Roles, Unprotected, AllowAnyRole } from 'nest-keycloak-connect';
import { AuthenticationGuard } from './authentication/authentication.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hello')
  @UseGuards(AuthenticationGuard)
  getHello(): string {
    return this.appService.getHello();
  }
  @Post('/hello')
  createData(): string {
    return this.appService.getHello();
  }
  @Get('/all')
  getAll(): string {
    return this.appService.getAllData();
  }
}
