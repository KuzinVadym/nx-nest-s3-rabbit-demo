import { Injectable } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { err, ok } from 'neverthrow';
import { AxiosError } from 'axios';
import { get } from 'lodash';

import { TDownloadLinkInputV1, TDownloadLinkResult } from '../interfaces';


@Injectable()
export class AssetsV1Service {
    constructor(
        private readonly logger: PinoLogger,
      ) {}

    async downloadAssetLink(payload: TDownloadLinkInputV1): Promise<TDownloadLinkResult> {
      try {
        return ok({ status: 'OK' });
      } catch (error: Error | unknown) {
        this.logger.error(error);
        return this.returnError(error);
      }  
    }  

    private returnError = (error: AxiosError | Error | unknown) => {
      if (error instanceof Error) {
        return err(error);
      }
      
      if (error instanceof AxiosError) {
       
        const errorResponse = get(error, 'response');
        if (errorResponse && errorResponse.status === 500) {
            return err(new Error('Error occurred during downloading a Link'));
        }
      }

      return err(new Error('Error occurred during downloading a Link'));
    };
}
