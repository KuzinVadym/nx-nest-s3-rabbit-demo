import { Test } from '@nestjs/testing';
import { AssetsManagerClientV1Service } from './assets-manager-client-v1.service';

describe('AssetsManagerClientService', () => {
  let service: AssetsManagerClientV1Service;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [AssetsManagerClientV1Service],
    }).compile();

    service = module.get(AssetsManagerClientV1Service);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
