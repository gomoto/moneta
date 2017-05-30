import { firebaseApp } from './firebase';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { settings } from './app/app.settings';
import { authenticate, getAccessToken, getIdTokenPayload } from './app/auth/auth-zero';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

authenticate((error) => {
  if (error) {
    console.error(error);
    return;
  }
  console.log('authenticated successfully!');
  console.log(getIdTokenPayload())
  console.log(getAccessToken())
  platformBrowserDynamic().bootstrapModule(AppModule);
});
