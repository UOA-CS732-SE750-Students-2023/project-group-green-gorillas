# Retrospective Monster Server

### We use `yarn` as node management tool
if you do not have yarn installed, please run
```bash
npm install --global yarn
```

### We use docker to run the server
- if you do not have docker installed, please go to https://docs.docker.com/desktop/install/windows-install/ to install the docker
- Make sure your docker daemon is running

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# move the sample environment variables to actual environment
$ mv .sample.env .env

# launch the app within the docker
$ yarn start:docker-dev
```

Once you notice that <h4>main.ts info:  Retrospective Monster is listening to port: 8080</h3>
which means the server launch successfully

Then, you need run commands below to seed the data 
```bash
curl -X POST http://localhost:8080/api/data-seeder/seed
```

## Test

```bash
# unit tests
$ yarn run test

# test coverage
$ yarn run test:cov
```

### How to view the data in database 
```bash
yarn start:dynamo-admin
```
Navigate to the http://0.0.0.0:8001/

## Directory

- platform
    - bin
        - development `scripts for development`
            - docker-compose.yml
            - Dockerfile
        - production `scripts for production`
            - Dockerfile
    - src
        - config `save all the configuration related files`
        - constants `save all the resuable variables`
        - exceptions `custom exceptions`
        - i18n `save all the translations files`
        - jest-config `configuration for jest`
        - logger `logger framework`
        - middlewares `contains all middlewares with the app`
        - modules
          - application `application module containing controllers`
          - common `common module`
          - domain `retrospective domains`
          - external `external adapter like email sender`
          - gateway `gateway for websocket`
          - global `global module`
        - types `resuable types`
        - utils `pure util resuable function`
        - app.module.ts `entry module`
        - app.config.ts `configure the app`
        - main.ts `entry point`
      