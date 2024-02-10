import { Test } from '@nestjs/testing';
import { AssetsDataApiController } from './assets-data-api.controller';
import { AssetsDataApiService } from './assets-data-api.service';

describe('AssetsDataApiController', () => {
  let controller: AssetsDataApiController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [AssetsDataApiService],
      controllers: [AssetsDataApiController],
    }).compile();

    controller = module.get(AssetsDataApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
