import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
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
      }),
    ],
  })
export class MongoClientModule {}
