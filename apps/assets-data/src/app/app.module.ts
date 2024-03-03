import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AssetsDataApiModule } from 'assets-data-api';
import { configuration } from '../config';
import { LoggerModule } from 'nestjs-pino';
import { PostgresClientModule } from 'postgres-client';
import { MongoClientModule } from 'mongo-client';

@Module({
  imports: [
    LoggerModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    PostgresClientModule.registerAsync(),
    MongoClientModule.registerAsync(),
    AssetsDataApiModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
