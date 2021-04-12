import { APP_FILTER } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './orm.config';
import { CoursesModule } from './courses/courses.module';
import { StudentModule } from './student/student.module';
import { HttpErrors } from './shared/http.errors';
import { RegisterModule } from './register/register.module';
import { ConfigModule } from '@nestjs/config';
import {
  KeycloakConnectModule,
  ResourceGuard,
  RoleGuard,
  AuthGuard,
} from 'nest-keycloak-connect';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticationModule } from './authentication/authentication.module';
@Module({
  imports: [
    // KeycloakConnectModule.register({
    //   authServerUrl: 'http://localhost:9990/auth/',
    //   realm: 'courseregister',
    //   clientId: 'rest-client',
    //   secret: '2bba7169-d092-4110-bbf9-f3bae62314b2',
    // }),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(config),
    CoursesModule,
    StudentModule,
    RegisterModule,
    AuthenticationModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpErrors,
      // useClass: AuthGuard,
    },
    // {
    //   provide: APP_GUARD,
    //   useClass: ResourceGuard,
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: RoleGuard,
    // },
  ],
})
export class AppModule {}

// import { Module } from '@nestjs/common';
//
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { AuthenticationModule } from './authentication/authentication.module';
//
// @Module({
//   imports: [AuthenticationModule],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}
