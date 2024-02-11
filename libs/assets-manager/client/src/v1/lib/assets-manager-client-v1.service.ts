import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosError, AxiosInstance } from 'axios';
import axiosRetry from 'axios-retry';
import { ResultAsync } from 'neverthrow';

import { TDownloadLinkPayloadV1, TDownloadLinkResultV1 } from '../interfaces';

@Injectable()
export class AssetsManagerClientV1Service {
    axiosClient: AxiosInstance;

    constructor(
        private configService: ConfigService
    ) {
        const assetsManagerUrl = this.configService.get<string>('assetsManagerUrl');

        if (!assetsManagerUrl) {
            throw new Error('Missing Assets Manager Url');
        }

        this.axiosClient = axios.create({
          baseURL: `${assetsManagerUrl}/api/v1`,
          timeout: 5000,
        });
    
        axiosRetry(this.axiosClient, {
          retries: 3,
          retryDelay: (retryCount) => retryCount * 2000,
          retryCondition: (error) => error.response?.status === 503,
        });
    }


    async downloadLink(payload: TDownloadLinkPayloadV1): Promise<TDownloadLinkResultV1> {
        return ResultAsync.fromPromise(
          this.axiosClient({
            method: 'post',
            data: payload,
          }),
          (err) => err as AxiosError
        );
      }
}
