# Test Sr Pago

## Introduction

This is a test made for Sr Pago, it was made on NodeJS, for database it uses SQLite, but it could use perfectly MySQL

## Run locally

To ron this locally you have to start the 3 main services

- Users:

  1. Navigate to usersApi path `cd usersApi`

  2. Install all libraries with NPM `npm install`

  3. Run dev mode `npm run dev`

  4. The application will be running on port 3001 by default

- Movies:

  1. Navigate to usersApi path `cd moviesApi`

  2. Install all libraries with NPM `npm install`

  3. Run dev mode `npm run dev`

  4. The application will be running on port 3002 by default

- Sales:

  1. Navigate to usersApi path `cd salesApi`

  2. Install all libraries with NPM `npm install`

  3. Run dev mode `npm run dev`

  4. The application will be running on port 3003 by default

To se all the avialble enpoints you can found a Postman collection in the folder ```postaman/main-collection.json```

Users can run by itself, but movies and sales depends on users to varify the user info. Also sales depends on movies to create the reservations.

## Deployment

This application is deployed in AWS usins Github Actios found in ```.github/workflows/main.yml```, it is deployed via cloudformation, the templates where based on a example found [here](https://github.com/aws-samples/ecs-refarch-cloudformation)

The application net the deployment to create the Cognito Users Pool used for login, the Cognito Pool can be created manually but it is not recommended.

## What's next

The application by the date this instructions were written is not yet complete, here is a list of the pending task indentified.

- [ ] Add params validation on request, to avoid so much 50X erros

- [ ] Complete the reservations, this to list reservation to admin users or a user can see its onw previous reservations

- [ ] Add payment method

- [ ] Create a local proxy, so all services could be used as one

- [ ] Create Api Gateway template to deploy to cloud formation