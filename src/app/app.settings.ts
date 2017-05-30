// Try to initialize settings from global environment on load.
const _settings = window['AppSettings'] || {};

const settings = {
  api: {
    url: _settings.API_URL || 'localhost:3000'
  }
};

export { settings }
