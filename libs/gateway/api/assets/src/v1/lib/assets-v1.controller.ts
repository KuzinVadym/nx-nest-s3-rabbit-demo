import { Body, Controller, Get, Post } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';

import { AssetsV1Service } from './assets-v1.service';
import { TDownloadLinkInputV1 } from '../interfaces'
import { err } from 'pino-std-serializers';

@Controller('assets')
export class AssetsV1Controller {
  constructor(
    private assetsService: AssetsV1Service,
    private readonly logger: PinoLogger,
  ) {}

  @Post()
  async createTask(
    @Body() downloadLinkInput: TDownloadLinkInputV1,
  ) {

    try {
      const downloadAssetLinkResult = await this.assetsService.downloadAssetLink(downloadLinkInput);
  
      if(downloadAssetLinkResult.isOk()) {

        const downloadLinkValue = downloadAssetLinkResult.value;
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
          message: downloadAssetLinkResult.error.message,
          error: downloadAssetLinkResult.error,
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
