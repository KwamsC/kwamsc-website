FROM node:18.18.2-alpine3.18 as base

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

ENV PORT 8080

EXPOSE $PORT

FROM base as production

ENV NODE_PATH=./build

RUN npm run build
