import { Test } from '@nestjs/testing';
import { AssetsDataApiService } from './assets-data-api.service';

describe('AssetsDataApiService', () => {
  let service: AssetsDataApiService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [AssetsDataApiService],
    }).compile();

    service = module.get(AssetsDataApiService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
