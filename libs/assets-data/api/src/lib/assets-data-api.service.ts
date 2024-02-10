import { Injectable } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { Result, ResultAsync, err, ok } from 'neverthrow';

import { S3ClientService } from 's3-client';
import { AssetsRepository } from 'mongo-client';
import { CreateAssetDto } from '../dto';
import { set } from 'lodash';
import { TAssets, TAssetsWithSignedURL, TGetAssetsResult } from '../interfaces';

@Injectable()
export class AssetsDataApiService {
    constructor(
        private readonly logger: PinoLogger,
        private readonly s3BuckerService: S3ClientService,
        private readonly assetsRepository: AssetsRepository,
        ) {}

    async createAsset(createAssetPayload: CreateAssetDto) {
        try {
            return ResultAsync.fromPromise(
                this.assetsRepository.create(createAssetPayload),
                (err) => err 
            );
        } catch (error: Error | unknown) {
          return this.returnError(error, 'createAsset')
        }
      }
        
    async getAssets(): Promise<TGetAssetsResult> {
      try {
        const assetResult = await ResultAsync.fromPromise(
            this.assetsRepository.find({}),
            (err) => err 
        );

        if (assetResult.isErr()) {
          this.logger.error(assetResult.error);
          return this.returnError(assetResult.error, 'getAssets');
        }

        const assetsWithSignedUrlResult = await this.updateAssetsWithSignedUrl(assetResult.value);

        if (assetsWithSignedUrlResult.isErr()) {
          return this.returnError(assetsWithSignedUrlResult.error, 'getAssets');
        }

        return ok(assetsWithSignedUrlResult.value);
      } catch (error: Error | unknown) {
        return this.returnError(error, 'getAssets')
      }
    }      

    private async updateAssetsWithSignedUrl(assets: TAssets[]): Promise<Result<TAssetsWithSignedURL[], Error>> {
      try {
        let assetsWithSignedUrl: TAssetsWithSignedURL[] = [];
        for (const asset of assets) {
          const assetUrlResult = await this.s3BuckerService.getSignedUrl(asset.name);

          if (assetUrlResult.isErr()) {
            throw new Error(`Something went wrong during execution of s3BuckerService.getSignedUrl`)
          }

          assetsWithSignedUrl.push({
            ...asset,
            assetUrl: assetUrlResult.value
          })
        }  

        return ok(assetsWithSignedUrl);
      } catch (error) {
        return this.returnError(error, 'updateAssetsWithSignedUrl')
      }
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
