import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

import { S3ClientModule } from 's3-client';
import { ASSETS_DATA_SERVICE, QueueModule } from 'queue';
import { AssetsManagerApiV1Controller } from './assets-manager-api-v1.controller';
import { AssetsManagerApiV1Service } from './assets-manager-api-v1.service';

@Module({
  imports: [
    LoggerModule.forRoot(),
    QueueModule.register({
      name: ASSETS_DATA_SERVICE,
    }),
    S3ClientModule
  ],
  controllers: [AssetsManagerApiV1Controller],
  providers: [
    AssetsManagerApiV1Service
  ],
  exports: [AssetsManagerApiV1Service],
})
export class AssetsManagerApiV1Module {}
