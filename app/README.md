# Retrospective Monster Client


### We use `yarn` as node management tool
if you do not have yarn installed, please run
```bash
npm install --global yarn
```

## Installation

```bash
$ yarn install
```

## Running the app

```bash
yarn dev
```

Once you notice that <h4>VITE v4.2.2  ready in xxx ms</h3>
which means the client launch successfully

You could open up the browser to navigate to http://localhost:3000
## Test

```bash
# unit tests
$ yarn run test
```

## Directory

- app
    - public `folder to save static files`
    - src `soruce foulds`
      - api
        - api.ts `list all the APIs`
        - request `custom api request containing axios middleware`
      - assets `static files to be used in the runtime`
      - components
        - common `resuable components folder`
        - screens `each screen component represents the each url`
        - hooks `custom hook for resusable use propose`
        - provider `context providers`
        - type `resuable types`
        - utils `pure util resuable function`
      App.tsx `root/entry component`
      main.tsx `entry point`