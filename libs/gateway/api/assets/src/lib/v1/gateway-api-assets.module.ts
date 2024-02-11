import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

import { AssetsDataClientModule } from 'assets-data-client';
import { AssetsManagerClientV1Module } from 'assets-manager-client';
import { GatewayApiAssetsController } from './gateway-api-assets.controller';
import { GatewayApiAssetsService } from './gateway-api-assets.service';

@Module({
  imports: [
    LoggerModule.forRoot(),
    AssetsManagerClientV1Module,
    AssetsDataClientModule
  ],
  controllers: [GatewayApiAssetsController],
  providers: [
    GatewayApiAssetsService,
  ],
  exports: [GatewayApiAssetsService],
})
export class GatewayApiAssetsModule {}