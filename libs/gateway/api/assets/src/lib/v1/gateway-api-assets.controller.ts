import { Body, Controller, Get, Post } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';

import { GatewayApiAssetsService } from './gateway-api-assets.service';
import { TDownloadLinkInputV1 } from './interfaces'

@Controller('assets')
export class GatewayApiAssetsController {
  constructor(
    private assetsService: GatewayApiAssetsService,
    private readonly logger: PinoLogger,
  ) {}

  @Get()
  async getAssets() {
    try {
      const getAssetsResult = await this.assetsService.getAssets();
  
      if(getAssetsResult.isOk()) {

        const downloadLinkValue = getAssetsResult.value;
        return {
          status: 200,
          body: {
            data: downloadLinkValue,
            message: 'OK',
            error: null,
          },
        }
      }
      
      return {
        status: 500,
        body: {
          data: null,
          message: getAssetsResult.error.message,
          error: getAssetsResult.error,
        },
      }
    } catch (err: Error | unknown) {
      return {
        status: 500,
        body: {
          data: null,
          message: 'Error ocuer during handling Get Assets request',
          error: err,
        },
      }
    }
  }
  
  @Post()
  async createTask(
    @Body() downloadLinkInput: TDownloadLinkInputV1,
  ) {
    try {
      const downloadLinkResult = await this.assetsService.downloadLink(downloadLinkInput);
  
      if(downloadLinkResult.isOk()) {

        const downloadLinkValue = downloadLinkResult.value;
        return {
          status: 200,
          body: {
            data: downloadLinkValue,
            message: 'OK',
            error: null,
          },
        }
      }
      
      return {
        status: 500,
        body: {
          data: null,
          message: downloadLinkResult.error.message,
          error: downloadLinkResult.error,
        },
      }
    } catch (err: Error | unknown) {
      return {
        status: 500,
        body: {
          data: null,
          message: 'Error ocuer during handling download link request',
          error: err,
        },
      }
    }
  }
}
