import { firebaseApp } from './firebase';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { settings } from './app/app.settings';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

console.log(settings);

platformBrowserDynamic().bootstrapModule(AppModule);
