FROM node:16.18.1

WORKDIR /usr/app

COPY package.json .
COPY yarn.lock .

RUN yarn

COPY . .
