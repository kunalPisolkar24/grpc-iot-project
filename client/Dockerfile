FROM node:18-slim AS builder

WORKDIR /usr/src/app

COPY client/package*.json ./
RUN npm install

COPY proto ./proto/
COPY client/src ./src
COPY client/tsconfig.json .

RUN npm run proto:gen
RUN npm run build

FROM node:18-slim

WORKDIR /usr/src/app

COPY client/package*.json ./
RUN npm install --omit=dev

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/src/proto_gen ./dist/proto_gen
COPY certs/server.crt ./certs/server.crt