# Moneta

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.6.

## Development server

`npm run dev` is like `ng serve` but can be configured using environment variables.

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## App settings

The @angular/cli "environment" system does not support deploy-time configuration from environment variables.

In addition to building the application, you can build a file called `settings.js` that defines a global object called `AppSettings` with which the application will override its default settings. The script which builds that file, `scripts/settings.sh`, accepts configuration from environment variables.

## Environment variables

environment variable       | default          | description
-------------------------- | ---------------- | -------------------------------------------------------------------------
API_URL                    | http://localhost:3000   | Location of the main application API.
AUTH0_API_AUDIENCE         |                  | Auth0 API audience id for the application API. Required when not offline.
AUTH0_DOMAIN               |                  | Auth0 tenant. Required when not offline.
AUTH0_CLIENT_ID            |                  | Auth0 application id. Required when not offline.
AUTH0_CALLBACK_PATH        | /callback        | Path to Auth0 callback.
AUTH0_SILENT_CALLBACK_URL  | ${API_URL}/silent-callback  | URL to Auth0 silent-callback.
DEVELOPMENT_PORT           | 4200             | Port when running in development environment.
NODE_ENV                   | development      | Node environment

## Auth0 rules

### Add user_metadata to id_token

```javascript
function (user, context, callback) {
  var CLIENTS = [
    'xxx'
  ];
  var userMetadataScope = 'https://user_metadata';

  // Only run this rule if:
  if (
    // (1) client is listed above.
    CLIENTS.indexOf(context.clientID) > -1 &&
    // (2) user info was requested in scope
    context.request.query.scope.split(' ').indexOf(userMetadataScope) > -1
  ) {
    // Set user_metadata on id_token, which is not automatically derived from user object!
    context.idToken[userMetadataScope] = user.user_metadata;
  }

  callback(null, user, context);
}
```
