import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { QueueModule } from 'queue';
import { S3ClientModule } from 's3-client';
import { MongoClientModule } from 'mongo-client';
import { PostgresClientModule } from 'postgres-client';
import { AssetsDataApiController } from './assets-data-api.controller';
import { AssetsDataApiService } from './assets-data-api.service';

@Module({
  imports: [
    QueueModule,
    S3ClientModule,
    MongoClientModule,
    PostgresClientModule,
  ],
  controllers: [AssetsDataApiController],
  providers: [AssetsDataApiService],
  exports: [AssetsDataApiService],
})
export class AssetsDataApiModule {}
