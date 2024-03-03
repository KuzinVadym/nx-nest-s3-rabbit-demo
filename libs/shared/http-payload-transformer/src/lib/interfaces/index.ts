import { ZodSchema } from 'zod';

export type TTransformRequestHandlers = {
  [key: string]: (params?: any, body?: any) => any;
};

export type TTransformRequestPayloadSchema = {
  [key: string]: ZodSchema;
};

export type TTransformRequestInitPayload = {
    contractName: string;
    payloadSchema: TTransformRequestPayloadSchema;
    handlers: TTransformRequestHandlers;
  };