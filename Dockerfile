FROM node:lts as builder

WORKDIR /app

COPY . .

RUN yarn install \
  --prefer-offline \
  --frozen-lockfile \
  --non-interactive \
  --production=false

ARG NUXT_ENV_API_HOST

ENV NUXT_ENV_API_HOST=$NUXT_ENV_API_HOST

RUN yarn generate

ENV HOST 0.0.0.0
EXPOSE 80

CMD [ "yarn", "start" ]