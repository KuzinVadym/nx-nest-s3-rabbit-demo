import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosError, AxiosInstance } from 'axios';
import axiosRetry from 'axios-retry';
import { ResultAsync } from 'neverthrow';
import { TGetAssetsResult } from '../interfaces';

@Injectable()
export class AssetsDataClientService {
    axiosClient: AxiosInstance;

    constructor(
        private configService: ConfigService
    ) {
        const assetsDataUrl = this.configService.get<string>('assetsDataUrl');

        if (!assetsDataUrl) {
            throw new Error('Missing Assets Manager Url');
        }

        this.axiosClient = axios.create({
          baseURL: `${assetsDataUrl}/api/v1`,
          timeout: 5000,
        });
    
        axiosRetry(this.axiosClient, {
          retries: 3,
          retryDelay: (retryCount) => retryCount * 2000,
          retryCondition: (error) => error.response?.status === 503,
        });
    }

    async getAssets(): Promise<TGetAssetsResult> {
        return ResultAsync.fromPromise(
          this.axiosClient({
            method: 'get'
          }),
          (err) => err as AxiosError
        );
      }
}
