import { Injectable } from '@nestjs/common';
import { ResultAsync, err, ok } from 'neverthrow';
import { PinoLogger } from 'nestjs-pino';
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { TDownloadLinkResult, TGetSignedUrlResult } from '../interfaces';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3ClientService {
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

    async getSignedUrl(name: string): Promise<TGetSignedUrlResult> {
        try {
            const command = new GetObjectCommand({
                Bucket: this.awsBucketName,
                Key: name,
            });

            const getSignedUrlResult = await ResultAsync.fromPromise(
                getSignedUrl(this.s3, command, { expiresIn: 3600 }),
                (err) => err as Error
              );

            if(getSignedUrlResult.isErr()) {
              this.logger.error(getSignedUrlResult.error.message);
              return err(getSignedUrlResult.error);
            }  

            return ok(getSignedUrlResult.value);
        } catch (error) {
            return this.returnError(error, 'getSignedUrl')
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
