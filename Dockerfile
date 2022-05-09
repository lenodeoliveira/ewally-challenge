FROM node:16

WORKDIR /usr/src/ewally-challenge

COPY ./package*.json .

RUN npm install --only=prod
