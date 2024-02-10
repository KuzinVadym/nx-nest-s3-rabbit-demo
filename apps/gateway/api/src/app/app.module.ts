import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { GatewayApiAssetsModule } from 'gateway-api-assets';
import { configuration } from '../config';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    LoggerModule.forRoot(),
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
