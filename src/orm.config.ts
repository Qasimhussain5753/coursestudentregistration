import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export const config: TypeOrmModuleOptions = {
  type: 'postgres',
  username: 'postgres',
  password: 'admin',
  port: 5432,
  host: '127.0.0.1',
  database: 'postgres',
  synchronize: true,

  entities: ['dist/**/*.entity{.ts,.js}'],
};

// import { TypeOrmModuleOptions } from '@nestjs/typeorm';
//
// export const typeOrmConfig: TypeOrmModuleOptions = {
//   type: 'postgres',
//   host: process.env.POSTGRES_HOST || 'localhost',
//   port: +process.env.POSTGRES_PORT || 5432,
//   username: process.env.DATABASE_USER || 'postgres',
//   password: process.env.DATABASE_PASSWORD || 'admin',
//   database: process.env.POSTGRES_DB || 'postgres',
//   entities: [__dirname + '../**/*.entity.{js,ts}'],
//   // migrationsRun: false,
//   logging: true,
//   // migrationsTableName: 'migration',
//   // migrations: [
//   //   __dirname + '/migration/**/*.ts',
//   //   __dirname + '/migration/**/*.js',
//   // ],
//   synchronize: true,
//   // cli: {
//   //   migrationsDir: 'src/migration',
//   // },
// };
