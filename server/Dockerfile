FROM node:20.12.2-alpine3.19 as base

WORKDIR /app

ENV PORT 8080
ENV HOST 0.0.0.0

COPY package*.json ./

RUN npm ci && npm cache clean --force

COPY . .

FROM base as production

ENV NODE_PATH=./build

RUN npm run build && npm prune --production

CMD ["node", "build/src/server.js"]
