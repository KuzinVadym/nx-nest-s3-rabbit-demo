import { Controller } from '@nestjs/common';
import { AssetsDataApiService } from './assets-data-api.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { QueueService, TCreateAssetEventPayload } from 'queue';
import { PinoLogger } from 'nestjs-pino';

@Controller()
export class AssetsDataApiController {
  constructor(
    private readonly logger: PinoLogger,
    private readonly assetsDataApiService: AssetsDataApiService,
    private readonly queueService: QueueService,
  ) {}

  @EventPattern('create_asset')
  async handleOrderCreated(@Payload() payload: TCreateAssetEventPayload, @Ctx() context: RmqContext) {
    this.logger.info(`Receive new "create_asset" event`);

    const createAssetResult = await this.assetsDataApiService.createAsset(payload);

    if (createAssetResult.isErr()) {
      this.logger.error(`Reject message from "create_asset" queue due to error during saving asset to DB`)
      this.queueService.reject(context);
    }

    this.logger.info('Message successfully acknowledged');
    this.queueService.ack(context);
  }
}
