# project-group-green-gorillas
***

## How to run the app

We use docker to run the server
- if you do not have docker installed, please go to https://docs.docker.com/desktop/install/windows-install/ to install the docker
- Make sure your docker daemon is running

We use `yarn` as node management tool
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

# Once you notice that
main.ts info: Retrospective Monster is listening to port: 8080

# which means the server launch successfully, the server is up in http://localhost:8080
# Then, you need run commands below to seed the data

```


### How to seed data?
```bash
# Open a new terminal and run the following script.

curl -X POST http://localhost:8080/api/data-seeder/seed 

# Warning: It is very important to make sure your server has started before running this code in your terminal
```



### How to launch the frontend app locally?
```bash
# Please open a new terminal and navigate to the frontend folder
cd app

# Install dependencies
yarn install 

# launch
yarn dev
```
***

### How to play the App?

1.Open the link: \
Local:   http://localhost:3000/  \

<img width="729" alt="image" src="https://github.com/UOA-CS732-SE750-Students-2023/project-group-green-gorillas/assets/80732580/b033f6f5-9483-4232-b892-fa8f15fcbdd2">


2.Input the email address and password.\
Feel free to use the following email address and password.\
Email: reviewer@aucklanduni.ac.nz Password: 123456\
Email: marker@aucklanduni.ac.nz Password: 123456
***

#### 1. How well have you mastered React, git, and other tools / frameworks introduced in this course?
As a team, we have achieved a solid understanding of React, git, and other tools and frameworks introduced in this course. We have been able to effectively utilize React to create robust single-page applications with React Router, Context, and local browser storage.

In addition, we have learned to consume APIs from both Node.js/Express and React using fetch() and axios. To ensure that our code is of high quality, we have extensively tested our JavaScript code using Jest, including testing async code, and mocking, and mocking API calls. We have also tested our Express APIs, and have used React Testing Library to test our React components.

Overall, we feel confident in our ability to use these tools and frameworks to develop robust and maintainable applications, while adhering to best practices and applying effective project management techniques.
#### 2. Have you shown the ability to carry out further learning beyond the course material to add value to your prototype?
As a team, we have also gained knowledge in additional frameworks and tools beyond the course material (which has been allowed by the lecturer before starting the project), including Nest.js, TypeScript, Material UI, DynamoDB, and so forth

With Nest.js, we have been able to create scalable and maintainable server-side applications using TypeScript. We have also learned to use TypeScript to write strongly-typed JavaScript, which has improved the readability and maintainability of our code.

In terms of UI development, we have explored Material UI and its pre-built React components, which has allowed us to create visually appealing and responsive user interfaces in a shorter amount of time. We have also gained knowledge in using DynamoDB, a NoSQL database, and have learned to use it for data storage in our applications.

Overall, our team has demonstrated the ability to learn and apply new tools and frameworks beyond the course material, which has added value to our prototype and has allowed us to develop more robust and efficient applications.

#### 3. Has your code been developed according to best-practices within your applied frameworks? Is it understandable and maintainable?
##### a.Front-end:
Please refer to the [frontend README](https://github.com/UOA-CS732-SE750-Students-2023/project-group-green-gorillas/wiki/How-to-run-Retrospective-Monster-Client%3F)for instructions on how to run and develop the frontend of the application.
##### b.Back-end:
Please refer to the [backend README](https://github.com/UOA-CS732-SE750-Students-2023/project-group-green-gorillas/wiki/How-to-run-Retrospective-Monster-Server%3F) for instructions on how to run and develop the backend of the application.
##### c.Wiki:
Please refer to the Here's a link to [wiki](https://github.com/UOA-CS732-SE750-Students-2023/project-group-green-gorillas/wiki).
for architecture diagrams and further explanation of the project's design decisions and implementation details.
##### d.Code quality:
Our team has developed the frontend and backend code according to best practices within our applied frameworks, including following consistent coding style and structure, utilizing modular design, and keeping code maintainable and understandable through documentation and code review. We have also conducted testing using Jest, React Testing Library, and other tools to ensure code quality and catch errors early in the development process.

#### 4.Has your code been tested? How?
Yes, our team has tested our code extensively using Jest, a popular JavaScript testing framework.

We have used Jest to write unit tests, integration tests, and end-to-end tests to ensure that our code functions as expected and is free from bugs. Our tests cover a wide range of scenarios, including testing both synchronous and asynchronous code, testing edge cases, and testing error handling.

In addition, we have made use of Jest's mocking and spying capabilities to isolate parts of our code and test them in isolation. We have also used Jest to mock external dependencies, such as APIs, to ensure that our tests are consistent and reliable.

Our team has made testing a core part of our development process, and we have integrated testing into our continuous integration and deployment pipeline to catch errors early and ensure that our code is of high quality.
#### 5.Is there evidence of good project management, and appropriate contribution from all team members?

[Project-Management](https://github.com/UOA-CS732-SE750-Students-2023/project-group-green-gorillas/wiki/Project-Management)
* [Task Breakdown with Assignees](https://docs.google.com/spreadsheets/d/1PfMBGzP6S07vUS5GrxpW0-qTBU9FCGQMnis5TYSS9ww/edit?usp=sharing)
* [Project Meetings](https://github.com/UOA-CS732-SE750-Students-2023/project-group-green-gorillas/wiki/Project-Meeting)
* [Team Memebers](https://github.com/UOA-CS732-SE750-Students-2023/project-group-green-gorillas/wiki/Team-members)

![github com_UOA-CS732-SE750-Students-2023_project-group-green-gorillas_graphs_contributors](https://github.com/UOA-CS732-SE750-Students-2023/project-group-green-gorillas/assets/80732580/5faf084b-4417-4607-a398-cf860f3d431e)




