#!/usr/bin/env bash

OUTPUT_PATH=dist

# Build application.
ng build --output-path=$OUTPUT_PATH --aot --target=production

# Build settings file.
sh scripts/settings.sh
