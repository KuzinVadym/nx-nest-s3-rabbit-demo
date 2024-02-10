import { config } from 'dotenv';

config();

const { env } = process;

export const configuration = () => {
  const rabbitMQUrl = env.RABBIT_MQ_URL;
  const rabbitMQQueueName = env.RABBIT_MQ_QUEUE_NAME;

  if (rabbitMQUrl && rabbitMQQueueName) {
    return {
      rabbitMQUrl,
      rabbitMQQueueName
    };
  }

  throw new Error('Missing Some of RabbitMQ Credentials');
};