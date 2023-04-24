# project-group-green-gorillas

### We use `yarn` as node management tool
if you do not have yarn installed, please run
```bash
npm install --global yarn
```

### How to launch the backend app locally?
```bash
# navigate to the backend folder
cd platform

# Install dependencies
yarn install 

# if .env is not existed, please run (first time launch the project)
mv .env.sample .env

# launch
yarn start:docker-dev

# Once the Backend App launch successfully, 
# Please open another terminal and run the script below to seed data
curl -X POST http://localhost:8080/api/data-seeder/seed
```


### How to launch the frontend app locally?
```bash
# Please open a new terminal and
# navigate to the frontend folder
cd app

# Install dependencies
yarn install 

# launch
yarn dev
```

### How to watch the database
```bash
cd platform

yarn start:dynamo-admin
```
Navigate to the http://0.0.0.0:8001/

Good Good
