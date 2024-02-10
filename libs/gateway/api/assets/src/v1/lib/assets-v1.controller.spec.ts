import { Test } from '@nestjs/testing';
import { LoggerModule } from 'nestjs-pino';

import { AssetsV1Controller } from './assets-v1.controller';
import { AssetsV1Service } from './assets-v1.service';

describe('AssetsController', () => {
  let controller: AssetsV1Controller;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [LoggerModule.forRoot()],
      providers: [AssetsV1Service],
      controllers: [AssetsV1Controller],
    }).compile();

    controller = module.get(AssetsV1Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
