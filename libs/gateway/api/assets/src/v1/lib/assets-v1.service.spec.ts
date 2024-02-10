import { Test } from '@nestjs/testing';
import { AssetsV1Service } from './assets-v1.service';
import { LoggerModule } from 'nestjs-pino';

describe('AssetsService', () => {
  let service: AssetsV1Service;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [LoggerModule.forRoot()],
      providers: [AssetsV1Service],
    }).compile();

    service = module.get(AssetsV1Service);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
