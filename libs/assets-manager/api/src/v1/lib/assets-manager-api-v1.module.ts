import { Module } from '@nestjs/common';

import { AssetsManagerApiV1Controller } from './assets-manager-api-v1.controller';
import { AssetsManagerApiV1Service } from './assets-manager-api-v1.service';
import { LoggerModule } from 'nestjs-pino';
import { S3BuckerService } from './s3-bucket.service';

@Module({
  imports: [
    LoggerModule.forRoot(),
  ],
  controllers: [AssetsManagerApiV1Controller],
  providers: [
    S3BuckerService,
    AssetsManagerApiV1Service
  ],
  exports: [AssetsManagerApiV1Service],
})
export class AssetsManagerApiV1Module {}
