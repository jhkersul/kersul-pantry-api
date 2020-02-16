# Kersul Pantry - API
[![CircleCI](https://circleci.com/gh/jhkersul/kersul-pantry-api.svg?style=svg)](https://circleci.com/gh/jhkersul/kersul-pantry-api)

This is the backend for Kersul Pantry`s app.

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

## :warning: **IN DEVELOPMENT**
