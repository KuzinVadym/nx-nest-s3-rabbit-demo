import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AssetsManagerApiV1Module } from 'assets-manager-api'
import { configuration } from '../config';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    LoggerModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    AssetsManagerApiV1Module
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
