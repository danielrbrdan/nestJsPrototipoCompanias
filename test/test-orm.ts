import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const testTypeOrmModuleOptions: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: ':memory:',
  autoLoadEntities: true,
  synchronize: true,
};
