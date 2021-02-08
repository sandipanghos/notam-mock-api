# Notam Mock API

## Requirements

To use this SDK, you will need:

- [NodeJS v14.15.4 or above\*\*](https://nodejs.org/)

Node installation will include [NPM](https://www.npmjs.com/), which is
responsible for dependency management.

## Installation & Deployment

### Node.js

- `npm install` - To install dependencies

- `npm run lint` - Run ESlint and check the code.
- `npm start` - To start in dev mode (using node).
- `npm run dev` - To start in dev mode (using nodemon)

## Mock API

- ### Get /notams/geoJson

  `Return only json response with three item in items array with pagination.`

- ### Error

  ```
    {"message": "icaoLocation missing required peer notamNumber"}
  ```

- ### Get /notams/aixm

  `Return only xml response with three item in items array with pagination.`

- ### Error

  ```<?xml version="1.0" encoding="UTF-8"?>
  <ApiErrorModel>
  	<message>icaoLocation missing required peer notamNumber</message>
  </ApiErrorModel>

  ```

- ### Get /notams/aidap

  `Return only xml response with three item in items array with pagination.`

- ### Error

  ```<?xml version="1.0" encoding="UTF-8"?>
  <ApiErrorModel>
    <message>icaoLocation missing required peer notamNumber</message>
  </ApiErrorModel>
  ```

  - ### Note:

            Search by criteria is not implemented as it is not required in mock api as discussed in forum .
            Input Validation done for these query param below and x-api-key header.
            As discussed in forum all query param field validation not mandatory.This is same for other endpoint also



            Validation of query params

            pageNum: Joi.number().integer().min(1).default(1),
            pageSize: Joi.number().integer().min(1).max(50).default(20),
            notamNumber: Joi.string(),
            icaoLocation: Joi.string(),
            locationRadius: Joi.number().precision(2),
            locationLongitude: Joi.number().precision(2),
            locationLatitude: Joi.number().precision(2)

## Postman collection

`Check in docs section to test the mock api using postman collection.`
