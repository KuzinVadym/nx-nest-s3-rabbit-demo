import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AssetsMongoRepository } from './repositories';
import { Asset, AssetsSchema } from './shemas';

@Module({
    imports: [MongooseModule.forFeature([{ name: Asset.name, schema: AssetsSchema }]),],
    providers: [AssetsMongoRepository],
    exports: [
      MongooseModule.forFeature([{ name: Asset.name, schema: AssetsSchema }]),
      AssetsMongoRepository
    ],
  })
export class MongoClientModule {
  static registerAsync(): DynamicModule {
    return {
      module: MongoClientModule,
      imports: [
        MongooseModule.forRootAsync({
          useFactory: (configService: ConfigService) => {

            const mongoUrl = configService.get<string>('mongoUrl');

            if (!mongoUrl) {
                throw new Error('Missing Mongo Url');
              }

            return {
                uri: mongoUrl,
              }
          },
          inject: [ConfigService],
        })
      ],
      exports: [],
    };
  }
}
