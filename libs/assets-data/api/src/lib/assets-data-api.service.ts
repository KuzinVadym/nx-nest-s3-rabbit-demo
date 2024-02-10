import { Injectable } from '@nestjs/common';

import { AssetsRepository } from 'mongo-client';
import { CreateAssetDto } from '../dto';
import { ResultAsync, err } from 'neverthrow';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class AssetsDataApiService {
    constructor(
        private readonly logger: PinoLogger,
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
        
    async getAssets() {
      try {
        return ResultAsync.fromPromise(
            this.assetsRepository.find({}),
            (err) => err 
        );
    } catch (error: Error | unknown) {
      return this.returnError(error, 'getAssets')
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
