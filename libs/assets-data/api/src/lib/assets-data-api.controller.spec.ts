import { Test } from '@nestjs/testing';
import { AssetsDataApiController } from './assets-data-api.controller';
import { AssetsDataApiService } from './assets-data-api.service';
import { LoggerModule } from 'nestjs-pino';

import { QueueModule } from 'queue';
import { ConfigModule } from '@nestjs/config';

const configFn = () => ({
  awsBucketName: 'awsBucketName',
  awsBucketRegion: 'awsBucketRegion',
  awsAccessKey: 'awsAccessKey',
  awsSecretAccessKey: 'awsSecretAccessKey',
  rabbitMQUrl: 'rabbitMQUrl',
  rabbitMQQueueName: 'rabbitMQQueueName',
  mongoUrl: 'mongoUrl',
  postgresUrl: 'postgresUrl'
})

describe('AssetsDataApiController', () => {
  let controller: AssetsDataApiController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        LoggerModule.forRoot(),
        ConfigModule.forRoot({
          isGlobal: true,
          load: [configFn],
        }),
        QueueModule
      ],
      providers: [
        {
          provide: AssetsDataApiService,
          useValue: {
            findAssets: jest.fn(),
            createAsset: jest.fn()
          }
        }
      ],
      controllers: [AssetsDataApiController],
    }).compile();

    controller = module.get(AssetsDataApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
