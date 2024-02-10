import { Test } from '@nestjs/testing';
import { LoggerModule } from 'nestjs-pino';

import { GatewayApiAssetsController } from './gateway-api-assets.controller';
import { GatewayApiAssetsService } from './gateway-api-assets.service';

describe('GatewayApiAssetsController', () => {
  let controller: GatewayApiAssetsController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [LoggerModule.forRoot()],
      providers: [GatewayApiAssetsService],
      controllers: [GatewayApiAssetsController],
    }).compile();

    controller = module.get(GatewayApiAssetsController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
