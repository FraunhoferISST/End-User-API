# End-User API

This project contains a graphical user interface (GUI) for an onboarding demonstrator. It implements a sample onboarding flow for small and medium-sized enterprises (SMEs) in a fictitious dataspace according to the [use case description](docs/use-case.md). 

1. [Use Case Description](docs/use-case.md)
2. Onboarding Flow
   1. [Catena-X](docs/catena-x/README.md)
   2. ...
3. End-User API
   1. [Requirements](docs/requirements.md)
   2. [Wireframes](docs/wireframes.md)
   3. [Implementation Plan](docs/implementation.md)


## Technology

The End-User API is divided into frontend and backend components. It is an [Angular](https://angularjs.org/) application that uses the [EDC Data Dashboard](https://github.com/eclipse-edc/DataDashboard) library which is publicly available.

### Features

- The user can register to a dataspace. This repository currently covers the onboarding to [Catena-X](https://catena-x.net/) according to the [Catena-X registration process](docs/catena-x/README.md).
- The user can share their data with the configured dataspace(s).
- The user can discover and access data in the configured dataspace(s).

### Style 

This application uses [daisyUI](https://daisyui.com), based on [Tailwind CSS](https://tailwindcss.com), as component framework.

## Configuration

### Connector

This application uses the [Think-iT-Labs/edc-connector-client](https://github.com/Think-iT-Labs/edc-connector-client) for the integration of the EDC Management API.

### Application

The configuration is located at [app-config.json](public/config/app-config.json).

## Deployment

### Docker

To run this application in Docker, you have to execute the following commands.

1. `docker build -t end-user-api .`
2. `docker run -p 8080:8080 -v $PWD/public/config/:/app/config -v $PWD/nginx.conf:/etc/nginx/conf.d/default.conf end-user-api`

This application is available at <http://localhost:8080>.

## Local

To run this application locally, you have to execute the following commands.

_Note that 2. and 3. have to be executed for each run._

1. `npm install`
2. `npm run lib-start`
3. `npm run start`

The dashboard is available at <http://localhost:4200>.

## License

This project is licensed under the [Apache License 2.0](LICENSE).