import { firebaseApp } from './firebase';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { initializeSettings, getSettings } from './app/app.settings';

if (environment.production) {
  enableProdMode();
}

// Initialize settings.
initializeSettings((error) => {
  if (error) {
    console.error('Error initializing settings:', error);
    return;
  }
  console.log('Initialized settings:', getSettings());
  platformBrowserDynamic().bootstrapModule(AppModule);
});
