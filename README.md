# snap-dragon

A simple, opinionated approach to managing chores

# Development

## Setup

- `nvm use`
- `npm rm -rf node_modules && npm install`
- [Initialize DB](Initialize-DB)
- `npm run dev`

## Format on save

- the vscode workspace configuration in this repo is setup for format on save but a formatter extension must be installed for it to work
- [install Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) for this to work automatically

## To Debug Backend

- `npm run dev:debug`
- In vscode, run `Attach` script in the debug menu

# DB

## Initialize DB

- (if this is the first time running app in this environment:)
  - `cp ./sequelize/sequelize_example.json ./sequelize/sequelize.json`
  - Make sure that both docker and docker-compose are installed
- `sudo docker-compose up`
- `npm run migrate`

## GUI

- the `sudo docker-compose up` command will run two services in locally-hosted docker containers
  - postgreSQL (DB server)
  - pgadmin4 (DB GUI client)
- to access `pgadmin4`, open a web browser to `localhost:80`
- use the login creds defined in `./docker-compose.yml` (`services.db_cli.environment`)
- (if this is the first time running `pgadmin4` in this environment) create a reference to the development DB:
  - right click `Servers` > Create > Server
  - Add a name for the server
  - In the `Connection` tab: fill out values for `Host`, `Username` and `Password`
    - find values for these in `./docker-compose.yml`
      - `Host`: the service-level field associated with the DB image e.g. `postgres`
      - `Username` and `Password`: `services.postgres.environment`
