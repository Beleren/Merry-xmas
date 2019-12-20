FROM node:10-alpine

RUN mkdir /app

RUN npm install nodemon -g

WORKDIR /app
COPY package*.json app/
RUN npm install
COPY . app/

CMD [ "npm", "start" ]