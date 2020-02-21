# Kersul Pantry - API
[![CircleCI](https://circleci.com/gh/jhkersul/kersul-pantry-api.svg?style=svg)](https://circleci.com/gh/jhkersul/kersul-pantry-api)

This is the backend for Kersul Pantry`s app. A pantry manager focused on Brazilian users. :)

## :warning: **Development Status**

- [X] Integration with [Bluesoft Cosmos API](https://cosmos.bluesoft.com.br/api)
- [ ] CRUD Product
- [ ] CRUD User
- [ ] CRUD Products List

## Requirements

### Bluesoft Cosmos API

You need a API Key from [Bluesoft Cosmos API](https://cosmos.bluesoft.com.br/api)

Set `COSMOS_ACCESS_TOKEN` environment variable:

```bash
COSMOS_ACCESS_TOKEN=<your-access-token>
```

## Starting/Developing with Docker

### Building

Build docker image:

```bash
$ docker-compose build
```

### Starting

Start service:

```bash
$ docker-compose up
```

Service will be available at [http://localhost:8080](http://localhost:8080)

### Tests

Run tests:

```bash
$ docker-compose run web yarn test
```

Or run tests in `watch` mode:

```bash
$ docker-compose run web yarn test --watch
```
