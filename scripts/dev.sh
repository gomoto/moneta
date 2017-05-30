#!/usr/bin/env bash

sh scripts/clean.sh

concurrently --kill-others "sh scripts/watch.sh" "sh scripts/serve.sh"
