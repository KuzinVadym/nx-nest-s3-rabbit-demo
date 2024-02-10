import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RmqContext, RmqOptions, Transport } from '@nestjs/microservices';

@Injectable()
export class QueueService {
    queueUrl: string;
    queueName: string;

    constructor(private readonly configService: ConfigService) {
        const queueUrl = configService.get<string>('rabbitMQUrl')
        const queueName = configService.get<string>('rabbitMQQueueName')

        if (!queueUrl || !queueName) {
            throw new Error('Missing RabbitMQ Url or Name');
        }

        this.queueUrl = queueUrl;
        this.queueName = queueName;
    }

    getOptions(): RmqOptions {
        return {
        transport: Transport.RMQ,
        options: {
            urls: [this.queueUrl],
            queue: this.queueName,
            noAck: false,
            persistent: true,
        },
        };
    }

    ack(context: RmqContext) {
        const channel = context.getChannelRef();
        const originalMessage = context.getMessage();
        channel.ack(originalMessage);
    }

    reject(context: RmqContext) {
        const channel = context.getChannelRef();
        const originalMessage = context.getMessage();
        channel.reject(originalMessage);
    }
}
