import * as auth0 from 'auth0-js';
import { settings } from '../app.settings';

// Simulate window.location.origin for all browsers.
const origin = `${window.location.protocol}//${window.location.host}`;

/**
 * Payload section of decoded id token.
 */
let _idTokenPayload: IdTokenPayload = null;

/**
 * Access token.
 */
let _accessToken = '';

/**
 * Get id token payload.
 * @return {IdTokenPayload}
 */
function getIdTokenPayload(): IdTokenPayload {
  return _idTokenPayload;
}

/**
 * Get access token.
 * @return {string}
 */
function getAccessToken(): string {
  return _accessToken;
}

const authOptions = {
  audience: settings.auth0.apiAudience,
  scope: 'openid https://user_metadata get:todos',
  responseType: 'token id_token'
};

/**
 * Configure Auth0 WebAuth client.
 */
const webAuth = new auth0.WebAuth({
  clientID: settings.auth0.clientId,
  domain: `${settings.auth0.tenant}.auth0.com`
});

/**
 * Authenticate user based on URL hash or silent token renewal.
 * If cannot authenticate user, redirect to auth0.com.
 * @param {Function} callback
 */
function authenticate(callback: (err: auth0.Auth0Error) => void): void {
  // Skip authentication if using offline user.
  if (settings.offline) {
    authenticateOffline(callback);
  } else {
    authenticateOnline(callback);
  }
}

function authenticateOffline(callback: (err: auth0.Auth0Error) => void): void {
  // const userRequest = new XMLHttpRequest();
  // userRequest.addEventListener('load', () => {
  //   _setIdTokenPayload(JSON.parse(userRequest.responseText));
  //   callback(null);
  // });
  // userRequest.open('GET', `${origin}/me`);
  // userRequest.send();
}

function authenticateOnline(callback: (err: auth0.Auth0Error) => void): void {
  if (window.location.pathname === settings.auth0.callbackPath) {
    /**
     * Set tokens from URL hash. After Auth0 authenticates user, it redirects to
     * callback path with tokens in the URL hash.
     */
    webAuth.parseHash(null, (error, parsedHash) => {
      if (error) {
        console.error('parseHash failed');
        callback(error);
        return;
      }
      if (!parsedHash) {
        console.warn('parsed hash is empty');
        callback(null);
        return;
      }
      // Update access token.
      _accessToken = parsedHash.accessToken;
      // Update id token payload.
      _idTokenPayload = parsedHash.idTokenPayload;
      callback(null);
    });
  } else {
    renewTokens(() => {
      callback(null);
    });
  }
}

/**
 * Renew tokens or redirect to Auth0 to start auth flow.
 * Errors while renewing tokens will cause a redirect to auth0.com.
 * If user is signed into another app via SSO, tokens should get renewed.
 */
function renewTokens(callback: () => void): void {
  webAuth.renewAuth({
    audience: authOptions.audience,
    scope: authOptions.scope,
    responseType: authOptions.responseType,
    clientID: settings.auth0.clientId,
    redirectUri: `${settings.auth0.silentCallbackUrl}`,
    usePostMessage: true
  }, (error: auth0.Auth0Error, response: auth0.Auth0DecodedHash) => {
    if (error) {
      console.error('renewAuth failed');
      login();
      return;
    }
    if (response['error'] === 'login_required') {
      console.error(response['errorDescription']);
      login();
      return;
    }
    // Update access token.
    _accessToken = response.accessToken;
    // Update id token payload.
    _idTokenPayload = response.idTokenPayload;
    callback();
  });
}

/**
 * Start auth flow from the beginning by redirecting to auth0.com.
 */
function login(): void {
  // Redirect to current path after reaching callback URL.
  const redirectTo = window.location.pathname;
  webAuth.authorize({
    audience: authOptions.audience,
    scope: authOptions.scope,
    responseType: authOptions.responseType,
    redirectUri: `${origin}${settings.auth0.callbackPath}?redirect=${redirectTo}`
  });
}

/**
 * Log out user by redirecting to auth0.com.
 */
function logout(): void {
  webAuth.logout({
    client_id: settings.auth0.clientId,
    returnTo: `${origin}`
  });
}

interface IdTokenPayload {
  user_id?: string;
  email?: string;
  iss?: string;
  sub?: string;
  aud?: string;
  exp?: number;
  iat?: number;
  user_metadata?: {
    first_name?: string;
    last_name?: string;
  }
  app_metadata?: {
    authorization?: {
      groups?: string[];
      roles?: string[];
      permissions?: string[];
    }
  }
}

export {
  authenticate,
  getAccessToken,
  getIdTokenPayload,
  logout
}
