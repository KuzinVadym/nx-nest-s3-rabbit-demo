import { Module } from '@nestjs/common';
import { AssetsDataApiController } from './assets-data-api.controller';
import { AssetsDataApiService } from './assets-data-api.service';

@Module({
  controllers: [AssetsDataApiController],
  providers: [AssetsDataApiService],
  exports: [AssetsDataApiService],
})
export class AssetsDataApiModule {}
