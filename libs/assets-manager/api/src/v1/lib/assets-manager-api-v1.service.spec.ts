import { Test } from '@nestjs/testing';
import { AssetsManagerApiV1Service } from './assets-manager-api-v1.service';
import { LoggerModule } from 'nestjs-pino';
import { S3ClientService } from 's3-client';
import { ASSETS_QUEUE_SERVICE } from 'queue';

describe('AssetsManagerApiService', () => {
  let service: AssetsManagerApiV1Service;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        LoggerModule.forRoot(),
      ],
      providers: [
        {
          provide: S3ClientService,
          useValue: {
            addToBucket: jest.fn(),
            getSignedUrl: jest.fn()
          }
        },
        {
          provide: ASSETS_QUEUE_SERVICE,
          useValue: {
            emit: jest.fn(),
          }
        },
        AssetsManagerApiV1Service
      ],
    }).compile();

    service = module.get(AssetsManagerApiV1Service);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
