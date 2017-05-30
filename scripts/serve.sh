#!/usr/bin/env bash

OUTPUT_PATH=dist

# Wait until directory is ready...
while [ ! -d $OUTPUT_PATH ]; do
  sleep 1;
done;

# Build settings file.
sh scripts/settings.sh

# Serve directory.
lite-server --baseDir=$OUTPUT_PATH --config=scripts/serve.config.js
