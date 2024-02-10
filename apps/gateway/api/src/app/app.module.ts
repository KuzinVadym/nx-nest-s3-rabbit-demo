import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AssetsV1Module } from 'gateway-api-assets';
import { configuration } from '../config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    AssetsV1Module
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
