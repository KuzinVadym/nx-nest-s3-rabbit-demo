import { Test } from '@nestjs/testing';
import { AssetsDataApiService } from './assets-data-api.service';
import { LoggerModule } from 'nestjs-pino';
import { S3ClientModule, S3ClientService } from 's3-client';
import { AssetsRepository } from 'postgres-client';

describe('AssetsDataApiService', () => {
  let service: AssetsDataApiService;

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
          provide: AssetsRepository,
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          }
        },
        AssetsDataApiService
      ],
    }).compile();

    service = module.get(AssetsDataApiService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
