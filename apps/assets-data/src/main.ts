/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';

import { QueueService } from 'queue';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const rmqService = app.get<QueueService>(QueueService);

  app.connectMicroservice<MicroserviceOptions>(rmqService.getOptions());

  await app.startAllMicroservices();

  Logger.log(
    `🚀 Assetst-Data ready to receive events via the RabbitMQ`
  );
}

bootstrap();
