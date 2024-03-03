import { get } from 'lodash';
import { PinoLogger } from 'nestjs-pino';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ZodSchema, ZodType, z } from 'zod';
import { NestControllerContract } from '@ts-rest/nest';
import { isAppRoute, AppRouter as Contract } from '@ts-rest/core';

import {
  TTransformRequestHandlers,
  TTransformRequestInitPayload,
  TTransformRequestPayloadSchema,
} from './interfaces';


@Injectable()
export class HttpPayloadTransformerService<TContract extends Contract> {
  contractName: string | undefined;

  contract: NestControllerContract<TContract> | undefined;

  transformRequestPayloadSchema: TTransformRequestPayloadSchema | undefined;

  transformRequestHandlers: TTransformRequestHandlers | undefined;

  constructor(
    private logger: PinoLogger,
    private configService: ConfigService,
  ) {}

  public init = ({
    contractName,
    payloadSchema,
    handlers,
  }: TTransformRequestInitPayload): void => {
    const contract =
      this.configService.get<NestControllerContract<TContract>>(contractName);

    if (!contract) {
      throw new Error(`${contractName}: contract is missing`);
    }

    this.contract = contract;
    this.contractName = contractName;
    this.transformRequestPayloadSchema = payloadSchema;
    this.transformRequestHandlers = handlers;

    if (!this.contract) {
      throw new Error(`${contractName}: contract is missing`);
    }

    if (!this.transformRequestPayloadSchema) {
      throw new Error(`${contractName}: payloadSchema is missing`);
    }

    if (!this.transformRequestHandlers) {
      throw new Error(`${contractName}: handlers is missing`);
    }
  };

  // eslint-disable-next-line class-methods-use-this
  public createRequestTransformSchema = (
    appRoute: keyof TContract
  ): ZodSchema => {
    try {
      this.checkBuilderComponentsAvailability();

      if (!this.contract || !isAppRoute(this.contract[appRoute])) {
        throw new Error(`${appRoute.toString()} is not AppRoute`);
      }

      const params: ZodType | unknown = get(
        this.contract,
        `${String(appRoute)}.pathParams`
      );
      const body: ZodType | unknown = get(
        this.contract,
        `${String(appRoute)}.body`
      );

      if (!(body instanceof ZodType)) {
        throw new Error('body is not ZodType, potentially undefined');
      }

      const transformHandler = get(
        this.transformRequestHandlers,
        `${String(appRoute)}`
      );

      if (transformHandler === undefined) {
        throw new Error(
          `transformHandler for ${String(appRoute)} is undefined`
        );
      }

      const payloadSchema: ZodSchema | undefined = get(
        this.transformRequestPayloadSchema,
        `${String(appRoute)}`
      );

      if (payloadSchema === undefined) {
        throw new Error(`payloadSchema for ${String(appRoute)} is undefined`);
      }

      if (params !== undefined) {
        if (params instanceof ZodType) {
          return z
            .object({
              params,
              body,
            })
            .transform(transformHandler)
            .pipe(payloadSchema);
        }
        throw new Error('params is not ZodType');
      }

      return z
        .object({
          body,
        })
        .transform(transformHandler)
        .pipe(payloadSchema);
    } catch (error: Error | unknown) {
      this.logger.error(error);
      throw error;
    }
  };

  private checkBuilderComponentsAvailability = (): void => {
    if (!this.contractName) {
      throw new Error('contractName is missing');
    }

    if (!this.contract) {
      throw new Error(`${this.contractName}: contract is missing`);
    }

    if (!this.transformRequestPayloadSchema) {
      throw new Error(`${this.contractName}: payloadSchema is missing`);
    }

    if (!this.transformRequestHandlers) {
      throw new Error(`${this.contractName}: handlers is missing`);
    }
  };
}
