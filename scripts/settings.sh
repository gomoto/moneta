#!/usr/bin/env bash

SETTINGS_FILE=dist/settings.js
SETTINGS_VARIABLE=AppSettings

cat > $SETTINGS_FILE << EndOfFile
var $SETTINGS_VARIABLE = {
  API_URL: '${API_URL:-http://localhost:3000}'
};
EndOfFile
