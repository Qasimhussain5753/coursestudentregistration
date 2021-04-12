import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World! this is qasim hussain ylf';
  }
  getAllData(): string {
    return 'ALl data ';
  }
}
