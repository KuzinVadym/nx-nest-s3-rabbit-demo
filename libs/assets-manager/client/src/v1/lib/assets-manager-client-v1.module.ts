import { Module } from '@nestjs/common';
import { AssetsManagerClientV1Service } from './assets-manager-client-v1.service';

@Module({
  controllers: [],
  providers: [AssetsManagerClientV1Service],
  exports: [AssetsManagerClientV1Service],
})
export class AssetsManagerClientV1Module {}
