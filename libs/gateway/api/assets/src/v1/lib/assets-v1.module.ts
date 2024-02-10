import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

import { AssetsV1Controller } from './assets-v1.controller';
import { AssetsV1Service } from './assets-v1.service';

@Module({
  imports: [
    LoggerModule.forRoot(),
  ],
  controllers: [AssetsV1Controller],
  providers: [
    AssetsV1Service,
  ],
  exports: [AssetsV1Service],
})
export class AssetsV1Module {}