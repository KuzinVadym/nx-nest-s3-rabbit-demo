import { Controller } from '@nestjs/common';
import { AssetsDataApiService } from './assets-data-api.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { QueueService, TCreateAssetEventPayload } from 'queue';

@Controller()
export class AssetsDataApiController {
  constructor(
    private readonly assetsDataApiService: AssetsDataApiService,
    private readonly queueService: QueueService,
    ) {}

  @EventPattern('create_asset')
  async handleOrderCreated(@Payload() payload: TCreateAssetEventPayload, @Ctx() context: RmqContext) {
    console.log('payload');
    console.log(payload);
  }
}
