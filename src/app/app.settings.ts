// Try to initialize settings from global environment on load.
const _settings = window['AppSettings'];

if (!_settings) {
  throw new Error('AppSettings object is not defined');
}

if (!_settings.AUTH0_API_AUDIENCE) {
  throw new Error('AUTH0_API_AUDIENCE is missing');
}

if (!_settings.AUTH0_CLIENT_ID) {
  throw new Error('AUTH0_CLIENT_ID is missing');
}

if (!_settings.AUTH0_DOMAIN) {
  throw new Error('AUTH0_DOMAIN is missing');
}

const settings = {
  api: {
    url: _settings.API_URL || 'localhost:3000'
  },
  auth0: {
    apiAudience: _settings.AUTH0_API_AUDIENCE,// REQUIRED
    clientId: _settings.AUTH0_CLIENT_ID,// REQUIRED
    domain: _settings.AUTH0_DOMAIN,// REQUIRED
    callbackPath: _settings.AUTH0_CALLBACK_PATH || '/callback',
    silentCallbackUrl: _settings.AUTH0_SILENT_CALLBACK_URL || `${window.location.protocol}//${window.location.host}/silent-callback`
  },
  offline: _settings.IS_OFFLINE === 'true'
};

console.debug('settings:', settings);

export { settings }
