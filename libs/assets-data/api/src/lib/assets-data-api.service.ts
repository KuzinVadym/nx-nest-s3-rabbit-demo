import { Injectable } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { err, ok } from 'neverthrow';

import { S3ClientService } from 's3-client';
import { AssetsRepository } from 'postgres-client';
import { TAsset, TCreateAssetPayload, TMutateAssetResult } from 'assets-interfaces';
import { TAssetsWithSignedURL, TFindAssetsResult, TUpdatedAssetsWithSignedUrl } from '../interfaces';

@Injectable()
export class AssetsDataApiService {
    constructor(
        private readonly logger: PinoLogger,
        private readonly s3BuckerService: S3ClientService,
        private readonly assetsRepository: AssetsRepository,
        ) {}

    async createAsset(createAssetPayload: TCreateAssetPayload): TMutateAssetResult {
        try {
            this.logger.info(`Create new Asset: ${createAssetPayload.name}`);

            const assetCreateResult =  await this.assetsRepository.create(createAssetPayload);


            if (assetCreateResult.isErr()) {
              return err(assetCreateResult.error)
            }

            return ok(assetCreateResult.value);
        } catch (error: Error | unknown) {
          return this.returnError(error, 'createAsset')
        }
      }
        
    async findAssets(): TFindAssetsResult {
      try {
        this.logger.info(`Find assets`);

        const assetResult = await this.assetsRepository.find({})

        if (assetResult.isErr()) {
          return err(assetResult.error);
        }

        const assetsWithSignedUrlResult = await this.updateAssetsWithSignedUrl(assetResult.value);

        if (assetsWithSignedUrlResult.isErr()) {
          return err(assetsWithSignedUrlResult.error);
        }

        return ok(assetsWithSignedUrlResult.value);
      } catch (error: Error | unknown) {
        return this.returnError(error, 'getAssets')
      }
    }      

    private async updateAssetsWithSignedUrl(assets: TAsset[]): TUpdatedAssetsWithSignedUrl {
      try {
        const assetsWithSignedUrl: TAssetsWithSignedURL[] = [];

        for (const asset of assets) {
          this.logger.info(`Update Asset - ${asset.name} - with SignedURL`);

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
