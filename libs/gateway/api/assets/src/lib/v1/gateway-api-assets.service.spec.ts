import { Test } from '@nestjs/testing';
import { GatewayApiAssetsService } from './gateway-api-assets.service';

describe('GatewayApiAssetsService', () => {
  let service: GatewayApiAssetsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [GatewayApiAssetsService],
    }).compile();

    service = module.get(GatewayApiAssetsService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
