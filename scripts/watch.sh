#!/usr/bin/env bash

OUTPUT_PATH=dist

# Build and rebuild application.
ng build --watch --output-path=$OUTPUT_PATH --aot #--target=production
