import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';


import { AssetsDataApiModule } from 'assets-data-api';
import { configuration } from '../config';

@Module({
  imports: [
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
