import { Injectable } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { err, ok } from 'neverthrow';
import { AxiosError } from 'axios';
import { get } from 'lodash';

import { TDownloadLinkInputV1, TDownloadLinkResult } from './interfaces';
import { AssetsManagerClientV1Service } from 'assets-manager-client';


@Injectable()
export class GatewayApiAssetsService {
    constructor(
        private readonly logger: PinoLogger,
        private readonly assetsManagerClient: AssetsManagerClientV1Service,
      ) {}

    getData(): { message: string } {
        return { message: 'Hello API' };
      }

    async downloadLink(payload: TDownloadLinkInputV1): Promise<TDownloadLinkResult> {
    
      const tempResult = await this.assetsManagerClient.downloadLink(payload);

      if( tempResult.isErr()) {
        this.logger.error(tempResult.error);
        return this.returnError(tempResult.error)
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
