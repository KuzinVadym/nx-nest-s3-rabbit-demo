import { Injectable } from '@nestjs/common';
import { ResultAsync, err, ok } from 'neverthrow';
import { PinoLogger } from 'nestjs-pino';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

import { TDownloadLinkPayloadV1 } from 'assets-manager-client';
import { TDownloadLinkResult } from '../interfaces';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3BuckerService {
    s3: S3Client;
    awsBucketName: string;

    constructor(
      private readonly logger: PinoLogger,
      private configService: ConfigService
      ) {
        const awsBucketName = this.configService.get<string>('awsBucketName');
        const awsBucketRegion = this.configService.get<string>('awsBucketRegion');
        const awsAccessKey = this.configService.get<string>('awsAccessKey');
        const awsSecretAccessKey = this.configService.get<string>('awsSecretAccessKey');

        if (!awsBucketName || !awsBucketRegion || !awsAccessKey || !awsSecretAccessKey) {
            throw new Error('Missing some of AWS Credentials');
        }

        this.s3 = new S3Client({
          credentials: {
            accessKeyId: awsAccessKey,
            secretAccessKey: awsSecretAccessKey
          },
          region: awsBucketRegion
        });

        this.awsBucketName = awsBucketName;
    }

    async addToBucket(assetBuffet: Buffer, assetName: string): Promise<TDownloadLinkResult> {
      try {
        const command = new PutObjectCommand({
          Bucket: this.awsBucketName,
          Key: assetName,
          Body: assetBuffet,
          ContentType: 'image/jpeg'
        });

        const putObjectCommandResult = await ResultAsync.fromPromise(
          this.s3.send(command),
          (err) => err as Error
        );

        if(putObjectCommandResult.isErr()) {
          this.logger.error(putObjectCommandResult.error.message);
          return err(putObjectCommandResult.error);
        }

        return ok({ status: 'Ok' });
      } catch (error: Error | unknown) {
        return this.returnError(error, 'addToBucket')
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
