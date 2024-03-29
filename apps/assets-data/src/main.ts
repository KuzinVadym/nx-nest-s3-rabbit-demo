/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { MicroserviceOptions } from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';
import { Logger as PinoLogger } from 'nestjs-pino';

import { QueueService } from 'queue';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const rmqService = app.get<QueueService>(QueueService);

  app.connectMicroservice<MicroserviceOptions>(rmqService.getOptions());

  const logger = app.get(PinoLogger);
  app.useLogger(logger);

  await app.startAllMicroservices();
  Logger.log(
    `🚀 Assetst-Data ready to receive events via the RabbitMQ`
  );

  const globalPrefix = 'api/v1';
  app.setGlobalPrefix(globalPrefix);
  app.enableCors();

  const port = process.env.ASSETS_DATA_PORT || 3002;
  
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
