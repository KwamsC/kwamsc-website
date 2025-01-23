# Base stage
FROM node:22.13.0-alpine3.21 as base

WORKDIR /app

ENV PORT 8080
ENV ADDRESS 0.0.0.0
ENV HOST 0.0.0.0

COPY package*.json ./

RUN npm ci && npm cache clean --force

COPY . .

# Build stage
FROM base as build

RUN npm run build

# Production stage
FROM node:22.12.0-alpine3.21 as production

WORKDIR /app

ENV PORT 8080
ENV ADDRESS 0.0.0.0
ENV HOST 0.0.0.0

# Copy only the necessary files from the build stage
COPY package*.json ./
COPY firebase.json ./

RUN npm ci --only=production && npm cache clean --force
COPY --from=build /app/build ./build

CMD ["node", "build/index.js"]