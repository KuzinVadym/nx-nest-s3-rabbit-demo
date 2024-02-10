import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

import { GatewayApiAssetsController } from './gateway-api-assets.controller';
import { GatewayApiAssetsService } from './gateway-api-assets.service';
import { AssetsManagerClientV1Module, AssetsManagerClientV1Service } from 'assets-manager-client';

@Module({
  imports: [
    LoggerModule.forRoot(),
    AssetsManagerClientV1Module
  ],
  controllers: [GatewayApiAssetsController],
  providers: [
    GatewayApiAssetsService,
  ],
  exports: [GatewayApiAssetsService],
})
export class GatewayApiAssetsModule {}