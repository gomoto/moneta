#!/usr/bin/env bash

OUTPUT_PATH=dist

# Remove old build.
rm -rf $OUTPUT_PATH

# Build application.
ng build --output-path=$OUTPUT_PATH --aot --target=production

# Build settings file.
sh scripts/settings.sh
