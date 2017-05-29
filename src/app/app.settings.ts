import * as deepExtend from 'deep-extend';

const _settings = {
  server: 'http://localhost:3000'
};

/**
 * Initialize settings from settings endpoint.
 * @param {Function} callback
 */
function initializeSettings(callback: (error: Error) => void) {
  const settingsEndpoint = `${_settings.server}/settings`;
  fetch(settingsEndpoint, {
    method: 'GET',
    cache: 'no-store'
  })
  .then((response) => {
    return response.json();
  })
  .then((settings) => {
    // Merge settings
    deepExtend(_settings, settings);
    callback(null);
  })
  .catch((error) => {
    callback(new Error(error));
  });
}

function getSettings() {
  return _settings;
}

export {
  initializeSettings,
  getSettings
}
