FROM node:20.12-alpine3.18 as base

WORKDIR /app

ENV PORT 8080
ENV ADDRESS 0.0.0.0
ENV HOST 0.0.0.0

COPY package*.json ./

RUN npm ci && npm cache clean --force

COPY . .

FROM base as production

RUN npm run build && npm prune --production

CMD npm start
