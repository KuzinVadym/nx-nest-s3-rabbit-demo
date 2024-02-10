import { Controller, Get } from '@nestjs/common';
import { AssetsDataApiService } from './assets-data-api.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { QueueService, TCreateAssetEventPayload } from 'queue';
import { PinoLogger } from 'nestjs-pino';
import { get } from 'lodash';

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

  @Get()
  async getAssets() {
    try {
      const assetsResult = await this.assetsDataApiService.getAssets();

      if(assetsResult.isOk()) {

        const assets = assetsResult.value;
        return {
          status: 200,
          body: {
            data: assets,
            message: 'OK',
            error: null,
          },
        }
      }
      
      return {
        status: 500,
        body: {
          data: null,
          message: get(assetsResult, 'error.message') || 'Error ocuer during handling get Assetsrequest',
          error: assetsResult.error,
        },
      }  
    } catch (error) {
      this.logger.error(error)
     return {
        status: 500,
        body: {
          data: null,
          message: 'Error ocuer during handling get Assetsrequest',
          error: error,
        },
      }
    }
  }
}
