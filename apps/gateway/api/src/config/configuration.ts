import { config } from 'dotenv';

config();

const { env } = process;

export const configuration = () => {
    const assetsManagerUrl = env.ASETS_MANAGEMENT_URL;

    if (assetsManagerUrl) {
      return {
        assetsManagerUrl,
      };
    }
  
    throw new Error('Missing Assets Manager Url');
};
