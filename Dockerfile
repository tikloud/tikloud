ARG NODE_VERSION=24.7.0
ARG ALPINE_VERSION=3.22
ARG BUILD_DIRECTORY=/usr/src/tikloud
ARG NODE_ENV=production


FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS base

FROM base AS builder

WORKDIR ${BUILD_DIRECTORY}

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

FROM base AS runner

WORKDIR ${BUILD_DIRECTORY}

COPY --from=builder ${BUILD_DIRECTORY}/package*.json .

RUN npm install --omit=dev

COPY --from=builder ${BUILD_DIRECTORY}/.next ./.next

RUN addgroup -g 1001 -S tikloud

RUN adduser -h ${BUILD_DIRECTORY} -h /bin/sh -G tikloud -S -D -H -u 1001 tikloud

RUN chown -R tikloud:tikloud ${BUILD_DIRECTORY}

CMD ["npm", "run", "start"]
