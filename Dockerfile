FROM node:10-alpine

RUN mkdir /app

RUN yarn global add nodemon

WORKDIR /app
COPY package.json yarn.lock app/
RUN yarn install
COPY . app/

CMD [ "yarn", "start" ]