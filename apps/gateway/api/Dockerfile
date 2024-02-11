# prisma 4.8 doesn't like alpine on M1, so we keep bullseye for now
FROM node:18-bullseye-slim

WORKDIR /usr/src/app

RUN apt-get update -y \
  && apt-get install -y openssl dumb-init \
  && rm -rf /var/lib/apt/lists/*

ENV NODE_ENV production
ENV ENVIRONMENT production

COPY --chown=node:node ./dist/apps/gateway/api/package.json ./dist/apps/gateway/api/yarn.lock ./

RUN yarn install --production --frozen-lockfile --network-timeout 100000

COPY --chown=node:node ./dist/apps/gateway/api .

USER node
EXPOSE 3400

ARG ASETS_MANAGEMENT_URL
ARG ASETS_DATA_URL

ENV ASETS_MANAGEMENT_URL $ASETS_MANAGEMENT_URL
ENV ASETS_DATA_URL $ASETS_DATA_URL

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "main.js"]
