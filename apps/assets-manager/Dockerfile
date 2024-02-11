# prisma 4.8 doesn't like alpine on M1, so we keep bullseye for now
FROM node:18-bullseye-slim

WORKDIR /usr/src/app

RUN apt-get update -y \
  && apt-get install -y openssl dumb-init \
  && rm -rf /var/lib/apt/lists/*

ENV NODE_ENV production
ENV ENVIRONMENT production

COPY --chown=node:node ./dist/apps/assets-manager/package.json ./dist/apps/assets-manager/yarn.lock ./

RUN yarn install --production --frozen-lockfile --network-timeout 100000

COPY --chown=node:node ./dist/apps/assets-manager .

USER node
EXPOSE 3400

ARG RABBIT_MQ_URL
ARG RABBIT_MQ_QUEUE_NAME
ARG AWS_BUCKET_NAME
ARG AWS_BUCKET_REGION
ARG AWS_ACCESS_KEY
ARG AWS_SECRET_ACCESS_KEY

ENV RABBIT_MQ_URL $RABBIT_MQ_URL
ENV RABBIT_MQ_QUEUE_NAME $RABBIT_MQ_QUEUE_NAME
ENV AWS_BUCKET_NAME $AWS_BUCKET_NAME
ENV AWS_BUCKET_REGION $AWS_BUCKET_REGION
ENV AWS_ACCESS_KEY $AWS_ACCESS_KEY
ENV AWS_SECRET_ACCESS_KEY $AWS_SECRET_ACCESS_KEY

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "main.js"]
