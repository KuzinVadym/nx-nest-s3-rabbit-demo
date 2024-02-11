import { Injectable } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { err, ok } from 'neverthrow';
import { AxiosError } from 'axios';
import { get } from 'lodash';

import { AssetsDataClientService } from 'assets-data-client';
import { AssetsManagerClientV1Service } from 'assets-manager-client';
import { TDownloadLinkInputV1, TDownloadLinkResult, TGetAssetsResult } from './interfaces';

@Injectable()
export class GatewayApiAssetsService {
    constructor(
        private readonly logger: PinoLogger,
        private readonly assetsManagerClient: AssetsManagerClientV1Service,
        private readonly assetsDataClientService: AssetsDataClientService,
      ) {}

    async getAssets(): Promise<TGetAssetsResult> {
      const getAssetsResult = await this.assetsDataClientService.getAssets();

      if( getAssetsResult.isErr()) {
        this.logger.error(getAssetsResult.error);
        return this.returnError(getAssetsResult.error)
      }

      const assets = getAssetsResult.value.data.body.data

      return ok(assets)
    }

    async downloadLink(payload: TDownloadLinkInputV1): Promise<TDownloadLinkResult> {
    
      const downloadLinkResult = await this.assetsManagerClient.downloadLink(payload);

      if( downloadLinkResult.isErr()) {
        this.logger.error(downloadLinkResult.error);
        return this.returnError(downloadLinkResult.error)
      }

      return ok({ status: 'OK' });
    }  

    private returnError = (error: AxiosError) => {
      if (error instanceof AxiosError) {
        
        const errorResponse = get(error, 'response');

        if (errorResponse && errorResponse.status === 500) {
          return err(new Error('Error occurred during downloading a Link'));
        }
      }

      return err(error);
    };
}
