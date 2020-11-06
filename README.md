# disxt-api-assignment

## OVERVIEW
This repository contains the codebase for the disxt-api-assignment and its endpoints as directed by the DISXT Team.

## TECHNOLOGIES USED
* Node.js
* Express.js
* MongoDB and Mongoose
* Mocha, Supertest, and Expect
* Docker and Docker-Compose
* Git and GitHub
* Ubuntu

## PREREQUISITES
Before getting started, ensure the following:
* **Node (version > 10) and npm** are installed
* Environment variables **DISXT_MAIN (mongodb uri for the main database), DISXT_TEST (mongodb uri for the test database) and DISXT_SECRET (secret for signing payloads)** are present in the shell to be used.
* **Docker is installed and running** (if the plan is to use Docker for the app)

## GETTING STARTED
1. Open a terminal in a shell (bash shell was used for the project)
2. Run `git clone https://github.com/jiobiagba/disxt-api-assignment` to clone the repo
3. Run `cd disxt-api-assignment`
4. Run `npm install`

## RUNNING TESTS
After following the instructions in the "Getting Started" section, run `npm run test` to run the attached tests. The tests will be run in a separate database to avoid dirty data in the actual database for live usage

## GENERAL USAGE
After following the instructions in the "Getting Started" section, run `npm run start` to start app locally.

## USING DOCKER
For Docker, 2 services (and containers) are created for usage:
* **mongodb (the database service)**
* **api (the actual app)**

For usage, 
1. Follow steps 1 - 3 in the "Getting Started" section
2. Run `touch config.env` in your terminal to create the file to hold the environment variables
3. Open the config.env file and add the DISXT_MAIN, DISXT_TEST, and DISXT_SECRET environment variables. For example,
`DISXT_MAIN=<put your main mongodb uri here>`
`DISXT_SECRET=<put your secret here>`
`DISXT_TEST=<put your test mongodb uri here>`
4. Save the changes made to the config.env
5. Run `npm run docker` to start both services and start using app. This will start the 2 services and show the running containers/services that are up

## API Documentation
For available endpoints and how to use them, please visit https://documenter.getpostman.com/view/5530976/TVYQ2ELP#e0233efb-5ce4-4ed0-8130-ceaf72bf970d
