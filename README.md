# Kersul Pantry - API

[![CircleCI](https://circleci.com/gh/jhkersul/kersul-pantry-api.svg?style=svg)](https://circleci.com/gh/jhkersul/kersul-pantry-api)

This is the backend for Kersul Pantry's app.
A pantry manager focused on Brazilian users. :)

## :warning: **Development Status**

- [X] Integration with [Bluesoft Cosmos API](https://cosmos.bluesoft.com.br/api)
- [X] Create product with bar code
- [X] Add product to pantry
- [X] API Docs
- [X] Remove product on pantry
- [X] Update product on pantry
- [X] List Pantry Products
- [X] List Products
- [ ] Add product to Shopping List
- [ ] Remove product to Shopping List
- [ ] Move product from Pantry to Shopping List
- [ ] List Shopping List Products
- [ ] Search registered products
- [ ] User authentication

## API Docs

[You can check API docs here](https://stoplight.io/p/docs/gh/jhkersul/kersul-pantry-api)

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
docker-compose build
```

### Starting

Start service:

```bash
docker-compose up
```

Service will be available at [http://localhost:8080](http://localhost:8080)

### Tests

Run tests:

```bash
docker-compose run web yarn test
```

Or run tests in `watch` mode:

```bash
docker-compose run web yarn test --watch
```

