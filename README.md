# Readme

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)

[![Node.js CI](https://github.com/lassesuomela/qt_zoo/actions/workflows/run-tests.yml/badge.svg?branch=main)](https://github.com/lassesuomela/qt_zoo/actions/workflows/run-tests.yml)

## Qt Group Node.js coding exercise

Task was to create Express.js REST API that had couple of endpoints. API should keep track of animals in a zoo. Animals consists of a unique id, a species, a name, an age, and a habitat. Animals should be stored in memory data storage. Some basic error handling was required. Basic input validation was required for required parameters.

## Bonus

Some bonus stuff:

1. Add pagination support to the GET /animals endpoint. DONE
2. Implement input validation for the age (e.g., ensure it's a positive number). DONE
3. Use a middleware for logging incoming requests and responses. DONE
4. Write unit tests for each endpoint. DONE

## How to setup

1. Clone repo.
2. Go to `./src` folder
3. Install dependencies with `npm i`
4. Start server with `npm start`
   - Or with nodemon using `npm run dev`
5. Tests can be ran with jest using `npm test`
   - This creates `coverage` folder in `./src`
     - In `./src/coverage/lcov-report/index.html` there is a code coverage report

## Endpoints

- `GET /animals` Returns a list of all animals in the zoo.

- `GET /animals/page/:page` Returns a list of all animals in the zoo per 5 animal increments using pagination.

- `GET /animals/:id` Returns details of a specific animal by its unique identifier.

- `POST /animals` Adds a new animal to the zoo. The request body should include the animal's species, name, age, and habitat.

- `PUT /animals/:id` Updates the details of a specific animal by its unique identifier. The
  request body should include the updated species, name, age, and habitat.

- `DELETE /animals/:id` Deletes a specific animal by its unique identifier.

## Screenshots

Screenshot from code coverage report
![Code coverage](screenshots/coverage.png)
