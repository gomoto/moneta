#!/usr/bin/env bash

SETTINGS_FILE=dist/settings.js
SETTINGS_VARIABLE=AppSettings

cat > $SETTINGS_FILE << EndOfFile
var $SETTINGS_VARIABLE = {
  API_URL: '${API_URL:-http://localhost:3000}',
  AUTH0_CLIENT_ID: '${AUTH0_CLIENT_ID}',
  AUTH0_DOMAIN: '${AUTH0_DOMAIN}',
  AUTH0_SILENT_CALLBACK_URL: '${AUTH0_SILENT_CALLBACK_URL}'
};
EndOfFile
