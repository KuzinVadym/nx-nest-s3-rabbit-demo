import { config } from 'dotenv';

config();

const { env } = process;

export const configuration = () => {
  const rabbitMQUrl = env.RABBIT_MQ_URL;
  const rabbitMQQueueName = env.RABBIT_MQ_QUEUE_NAME;
  const mongoUrl = env.MONGODB_URI;

  if (rabbitMQUrl && rabbitMQQueueName && mongoUrl) {
    return {
      rabbitMQUrl,
      rabbitMQQueueName,
      mongoUrl
    };
  }

  throw new Error('Missing Some of RabbitMQ or Mongo Credentials');
};