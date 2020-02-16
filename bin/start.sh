#/bin/bash

if [ -z "${NODE_ENV}" ]; then
  NODE_ENV="development"
fi

echo "Starting using environment: $NODE_ENV"

if [ $NODE_ENV = "production" ]; then
  yarn prod
else
  yarn dev
fi
