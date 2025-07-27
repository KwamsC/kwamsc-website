# Base stage
FROM node:24.4.1-alpine3.21 AS base

WORKDIR /app

ENV PORT 8080
ENV HOST 0.0.0.0

COPY package*.json ./

RUN npm ci && npm cache clean --force

COPY . .

# Production stage
FROM node:24.4.1-alpine3.21 AS production

WORKDIR /app

ENV PORT 8080
ENV HOST 0.0.0.0

# Copy package files and firebase config
COPY package*.json ./
COPY firebase.json ./

RUN npm ci --only=production && npm cache clean --force

# Copy source files directly (no build needed)
COPY src ./src

CMD ["node", "--experimental-strip-types", "src/server.ts"]