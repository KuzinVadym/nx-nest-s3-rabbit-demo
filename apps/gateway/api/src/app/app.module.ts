import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { GatewayApiAssetsModule } from 'gateway-api-assets';
import { configuration } from '../config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    GatewayApiAssetsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
