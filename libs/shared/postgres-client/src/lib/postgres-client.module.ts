import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Assets } from './entities';
import { AssetsRepository } from './repositories';

@Module({
  imports: [TypeOrmModule.forFeature([Assets])],
  providers: [AssetsRepository],
  exports: [
    TypeOrmModule.forFeature([Assets]),
    AssetsRepository
  ],
})
export class PostgresClientModule {
  static registerAsync(): DynamicModule {
    return {
      module: PostgresClientModule,
      imports: [
        TypeOrmModule.forRootAsync({
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => {
    
              const postgresUrl = configService.get<string>('postgresUrl');
    
              if (!postgresUrl) {
                  throw new Error('Missing Postgres Url');
                }
              return {
                  type: 'postgres',
                  url: postgresUrl,
                  entities: [Assets],
                  synchronize: true,
                }
          },
        }),
      ],
      exports: [],
    };
  }
}
