import { config } from 'dotenv';

config();

const { env } = process;

export const configuration = () => {
  const rabbitMQUrl = env.RABBIT_MQ_URL;
  const rabbitMQQueueName = env.RABBIT_MQ_QUEUE_NAME;
  const awsBucketName = env.AWS_BUCKET_NAME;
  const awsBucketRegion = env.AWS_BUCKET_REGION;
  const awsAccessKey = env.AWS_ACCESS_KEY;
  const awsSecretAccessKey = env.AWS_SECRET_ACCESS_KEY;
  const mongoUrl = env.MONGODB_URL;
  const postgresUrl = env.POSTGRES_URL;

  if (awsBucketName && awsBucketRegion && awsAccessKey && awsSecretAccessKey && rabbitMQUrl && rabbitMQQueueName && postgresUrl) {
    return {
      awsBucketName,
      awsBucketRegion,
      awsAccessKey,
      awsSecretAccessKey,
      rabbitMQUrl,
      rabbitMQQueueName,
      mongoUrl,
      postgresUrl
    };
  }

  throw new Error('Missing Some of AWS or RabbitMQ or Mongo Credentials');
};