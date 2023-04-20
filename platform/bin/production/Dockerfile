FROM node:16.18.1 AS development

WORKDIR /usr/app

COPY package.json .
COPY yarn.lock .

RUN yarn --only=development

COPY . .

RUN yarn build

FROM node:16.18.1 AS production

WORKDIR WORKDIR /usr/app

COPY package.json .
COPY yarn.lock .

RUN yarn --only=production

COPY . .

COPY --from=development /usr/app/dist ./dist

EXPOSE 8080
CMD ["yarn", "start:prod"]
