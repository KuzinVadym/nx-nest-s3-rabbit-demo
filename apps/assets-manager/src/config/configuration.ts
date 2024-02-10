import { config } from 'dotenv';

config();

const { env } = process;

export const configuration = () => {
  const awsBucketName = env.AWS_BUCKET_NAME;
  const awsBucketRegion = env.AWS_BUCKET_REGION;
  const awsAccessKey = env.AWS_ACCESS_KEY;
  const awsSecretAccessKey = env.AWS_SECRET_ACCESS_KEY;

  if (awsBucketName && awsBucketRegion && awsAccessKey && awsSecretAccessKey) {
    return {
      awsBucketName,
      awsBucketRegion,
      awsAccessKey,
      awsSecretAccessKey,
    };
  }

  throw new Error('Missing Some of AWS Credentials');
};