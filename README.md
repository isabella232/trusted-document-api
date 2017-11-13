# Readme

## Dependencies
Development and deployment of this application is completely dockerized. You don't need anything except `docker` and `docker-compose` for local development.

* [Docker](https://www.docker.com/)
* [Docker-compose (usually installed with docker)](https://docs.docker.com/compose/install/)
* [node](http://nodejs.org) (optional)
* [npm](https://www.npmjs.com) (optional)


## Structure
    .
    ├── .editorconfig
    ├── .gitignore
    ├── .dockerignore               - Ignore files for docker build
    ├── Dockerfile                  - Instructions to build docker container
    ├── docker-compose.yml          - Instructions to run all the services for development
    ├── package.json                - Used npm packages
    ├── .env.example                - Example of env variables needed
    ├── .env                        - File env variables are read from (ignored by git)
    ├── README.md
    ├── node_modules                - Contains bower modules
    ├── config                      - configuration for app
    │   ├── default.js                  - Reading env variables and providing constants etc.
    │   ├── test.js                     - Env variables for testing
    │   ├── express.js                  - Configures express
    │   ├── mongo.js                    - Configures mongo (datastore)
    │   └── winston.js                  - Configures winston (logging)
    ├── app                         - application files
    │   ├── apis                        - api handlers
    │   ├── controllers                 - controllers responsible for api handlers
    │   ├── services                    - Adapters to external services
    │   │    └── db                         - Database scripts (mongo)
    │   ├── auth                        - Auth middleware
    │   └── utils                       - Utility scripts
    └── test                        - Folder containing all the tests (mirrors app directory)
