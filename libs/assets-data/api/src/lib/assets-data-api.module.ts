import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { QueueModule } from 'queue';
import { MongoClientModule, Asset, AssetsSchema, AssetsRepository } from 'mongo-client';
import { AssetsDataApiController } from './assets-data-api.controller';
import { AssetsDataApiService } from './assets-data-api.service';

@Module({
  imports: [
    QueueModule,
    MongoClientModule,
    MongooseModule.forFeature([{ name: Asset.name, schema: AssetsSchema }]),
  ],
  controllers: [AssetsDataApiController],
  providers: [AssetsDataApiService, AssetsRepository],
  exports: [AssetsDataApiService],
})
export class AssetsDataApiModule {}
