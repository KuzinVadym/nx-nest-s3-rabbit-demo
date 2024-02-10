import { Module } from '@nestjs/common';

import { QueueModule } from 'queue';
import { AssetsDataApiController } from './assets-data-api.controller';
import { AssetsDataApiService } from './assets-data-api.service';

@Module({
  imports: [
    QueueModule
  ],
  controllers: [AssetsDataApiController],
  providers: [AssetsDataApiService],
  exports: [AssetsDataApiService],
})
export class AssetsDataApiModule {}
