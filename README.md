# snap-dragon

A simple, opinionated approach to managing chores

# Development

- `nvm use`
- `npm rm -rf node_modules && npm install`
- (first time only) see [Initialize DB](Initialize-DB)
- `sudo docker-compose up`
- `npm run dev`

## To Debug Backend

- `npm run dev:debug`
- In vscode, run `Attach` script in the debug menu

# DB

## Initialize DB

## GUI

- the host to use should be the docker-compose.yml service-level field associated with the DB image e.g. `postgres`
