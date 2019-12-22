FROM node:10-alpine

RUN mkdir /api

RUN yarn global add nodemon

WORKDIR /api
COPY package.json yarn.lock api/
RUN yarn install
COPY . api/

CMD [ "yarn", "start" ]