import { Body, Controller, Get, InternalServerErrorException, Post } from '@nestjs/common';

import { AssetsManagerApiV1Service } from './assets-manager-api-v1.service';
import { TDownloadLinkPayloadV1 } from 'assets-manager-client';

@Controller('')
export class AssetsManagerApiV1Controller {
  constructor(private assetsManagerApiService: AssetsManagerApiV1Service) {}


  @Get()
  getData() {
    return this.assetsManagerApiService.getData();
  }

  @Post()
  async downloadLink(
    @Body() downloadLinkPayload: TDownloadLinkPayloadV1,
  ) {
    const downloadLinkResult = await this.assetsManagerApiService.downloadLink(downloadLinkPayload);

    if (downloadLinkResult.isOk()){
      return {status: 'Ok'};
    }
    
    throw new InternalServerErrorException();
  }
}
