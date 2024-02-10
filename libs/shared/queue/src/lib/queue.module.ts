import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { QueueService } from './queue.service';

interface RmqModuleOptions {
  name: string;
}

@Module({
  providers: [QueueService],
  exports: [QueueService],
})
export class QueueModule {
  static register({ name }: RmqModuleOptions): DynamicModule {
    return {
      module: QueueModule,
      imports: [
        ClientsModule.registerAsync([
          {
            name,
            useFactory: (configService: ConfigService) => {
              const rmqUrl = configService.get<string>('rabbitMQUrl')
              const queueName = configService.get<string>('rabbitMQQueueName')

              if (!rmqUrl || !queueName) {
                throw new Error('Missing RabbitMQ Url or Queue Name');
              }
              return {
                transport: Transport.RMQ,
                options: {
                  urls: [rmqUrl],
                  queue: queueName,
                },
              }
            },
            inject: [ConfigService],
          },
        ]),
      ],
      exports: [ClientsModule],
    };
  }
}



