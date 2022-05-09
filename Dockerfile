FROM node:16

WORKDIR /usr/src/ewally-challenge

COPY ./package*.json .

RUN npm install --only=prod

COPY ./dist .dist

EXPOSE 8080

CMD npm start