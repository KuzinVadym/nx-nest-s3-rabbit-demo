import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

import { AssetsManagerApiV1Controller } from './assets-manager-api-v1.controller';
import { AssetsManagerApiV1Service } from './assets-manager-api-v1.service';


@Module({
  imports: [
    LoggerModule.forRoot(),
  ],
  controllers: [AssetsManagerApiV1Controller],
  providers: [
    AssetsManagerApiV1Service
  ],
  exports: [AssetsManagerApiV1Service],
})
export class AssetsManagerApiV1Module {}
