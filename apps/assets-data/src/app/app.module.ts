import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';


import { AssetsDataApiModule } from 'assets-data-api';
import { configuration } from '../config';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    LoggerModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    AssetsDataApiModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
