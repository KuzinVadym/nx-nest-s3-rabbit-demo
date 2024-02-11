import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import * as crypto from 'crypto';
import { PinoLogger } from 'nestjs-pino';
import axios, { AxiosError } from 'axios';
import { ResultAsync, err, ok } from 'neverthrow';
import {ExifParserFactory} from "ts-exif-parser";

import { S3ClientService } from 's3-client';
import { ASSETS_QUEUE_SERVICE, CREATE_ASSET_PATTERN, TCreateAssetEventPayload } from 'queue';
import { TDownloadLinkPayloadV1 } from 'assets-manager-client';
import { TDownloadAssetResult, TDownloadLinkResult } from '../interfaces';

@Injectable()
export class AssetsManagerApiV1Service {
    constructor(
      private readonly logger: PinoLogger,
      private readonly s3BuckerService: S3ClientService,
      @Inject(ASSETS_QUEUE_SERVICE) private assetsQueueClient: ClientProxy,
      ) {}

    getData(): { message: string } {
        return { message: 'Hello API' };
      }

    async downloadLink(downloadLinkPayload: TDownloadLinkPayloadV1): Promise<TDownloadLinkResult> {
      try {
        this.logger.info(`Download Asset from link: ${downloadLinkPayload.url}`);
        
        // dowload asset
        const assetBufferResult = await this.downloadAsset(downloadLinkPayload.url);

        if (assetBufferResult.isErr()) {
          return err(assetBufferResult.error);
        }

        const assetBuffer = assetBufferResult.value;
        const assetName = crypto.randomBytes(36).toString('hex');

        // save to s3
        const addToBucketResult = await this.s3BuckerService.addToBucket(assetBuffer, assetName);
        
        if (addToBucketResult.isErr()) {
          return err(addToBucketResult.error);
        }

        // extract metadata
        const assetMetadata = this.extractAssetMetadata(assetBuffer);
        
        // send to event queue
        await this.sendNewCreateAssetEvent({
          name: assetName,
          category: downloadLinkPayload.category,
          metadata: assetMetadata
        })

        // return status
        return ok({ status: 'Ok' });
      } catch (error: Error | unknown) {
        return this.returnError(error, 'downloadLink')
      }   
    }

    private downloadAsset = async (url: string): Promise<TDownloadAssetResult> => {
      try {
        const downloadAssetResult = await ResultAsync.fromPromise(
          axios({
            url,
            method: 'GET',
            responseType: 'arraybuffer'
          }),
          (err) => err as AxiosError
        );

        if(downloadAssetResult.isErr()) {
          this.logger.error(downloadAssetResult.error);
          return err(downloadAssetResult.error)
        }

        const downloadAsset = downloadAssetResult.value;
  
        const buffer = Buffer.from(downloadAsset.data, 'binary');
  
        return ok(buffer);
      } catch (error) {
        this.logger.error(error)
        return err(new Error('occurred during downloadAsset'))
      }
    }

    private extractAssetMetadata = (assetBuffer: Buffer): Record<string, any> => {

      const metadata = ExifParserFactory.create(assetBuffer).parse();

      return metadata;
    }

    private sendNewCreateAssetEvent = async (createAssetEventPayload: TCreateAssetEventPayload): Promise<void> => {
      await this.assetsQueueClient.emit(CREATE_ASSET_PATTERN, createAssetEventPayload)
    }

    private returnError = (error: Error | unknown, method: string) => {
      if (error instanceof Error) {
        this.logger.error(error.message);
      }
      return error instanceof Error
        ? err(error)
        : err(Error(
          `Something went wrong during ${method}`,
        ));
    };
}
