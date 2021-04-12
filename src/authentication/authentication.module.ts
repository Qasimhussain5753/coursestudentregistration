import { HttpModule, Module } from '@nestjs/common';

import { AuthenticationGuard } from './authentication.guard';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
@Module({
  imports: [HttpModule],
  providers: [AuthenticationGuard, AuthenticationService],
  controllers: [AuthenticationController],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
