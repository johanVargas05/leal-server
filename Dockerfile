FROM node:18-alpine3.15 AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:18-alpine3.15 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build


FROM node:18-alpine3.15 AS runner

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --prod

COPY --from=builder /app/dist ./dist

RUN mkdir -p ./leal
COPY --from=builder ./app/dist/ ./app
COPY ./.env ./app/.env

RUN mkdir -p ./public
COPY ./public ./public


RUN adduser --disabled-password lealUser
RUN chown -R lealUser:lealUser ./leal
USER lealUser


CMD [ "yarn","start" ]