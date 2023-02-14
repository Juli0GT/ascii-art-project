FROM node:14.11-alpine

COPY . /app
WORKDIR /app

RUN npm install

RUN npm run build

ENTRYPOINT npm start
