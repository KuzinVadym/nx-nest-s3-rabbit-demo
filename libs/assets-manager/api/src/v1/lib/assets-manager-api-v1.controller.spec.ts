import { Test } from '@nestjs/testing';
import { AssetsManagerApiV1Controller } from './assets-manager-api-v1.controller';
import { AssetsManagerApiV1Service } from './assets-manager-api-v1.service';

describe('AssetsManagerApiV1Controller', () => {
  let controller: AssetsManagerApiV1Controller;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [AssetsManagerApiV1Service],
      controllers: [AssetsManagerApiV1Controller],
    }).compile();

    controller = module.get(AssetsManagerApiV1Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
