import { Injectable } from '@nestjs/common';
import { Result, ResultAsync, err, ok } from 'neverthrow';
import { PinoLogger } from 'nestjs-pino';

import { TDownloadAssetResult, TDownloadLinkPayloadV1, TDownloadLinkResult } from '../interfaces';


@Injectable()
export class AssetsManagerApiV1Service {
    constructor(
      private readonly logger: PinoLogger,
      ) {}

    async downloadLink(downloadLinkPayload: TDownloadLinkPayloadV1): Promise<TDownloadLinkResult> {
      try {
        // dowload asset

        // save to s3
        
        // extract metadata
        
        // send to event queue

        // return status
        return ok({ status: 'Ok' });
      } catch (error: Error | unknown) {
        this.logger.error(error);
        return this.returnError(error, 'downloadLink')
      }   
    }


    private returnError = (error: Error | unknown, method: string) => {
      return error instanceof Error
        ? err(error)
        : err(Error(
          `Something went wrong during ${method}`,
        ));
    };
}
