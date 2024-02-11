import { config } from 'dotenv';

config();

const { env } = process;

export const configuration = () => {
  const assetsManagerUrl = env.ASETS_MANAGER_URL;
  const assetsDataUrl = env.ASETS_DATA_URL;

  if (assetsManagerUrl && assetsDataUrl) {
    return {
      assetsManagerUrl,
      assetsDataUrl
    };
  }

  throw new Error('Missing Assets Manager or Assets Data Url');
};
