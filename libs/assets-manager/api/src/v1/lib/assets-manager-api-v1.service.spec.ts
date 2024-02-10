import { Test } from '@nestjs/testing';
import { AssetsManagerApiV1Service } from './assets-manager-api-v1.service';

describe('AssetsManagerApiService', () => {
  let service: AssetsManagerApiV1Service;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [AssetsManagerApiV1Service],
    }).compile();

    service = module.get(AssetsManagerApiV1Service);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
