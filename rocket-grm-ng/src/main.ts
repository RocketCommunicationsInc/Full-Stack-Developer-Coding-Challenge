import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

declare global {
  interface Window {
    WebComponents: {
      ready: boolean;
    };
  }
}

if (environment.production) {
  enableProdMode();
}

function bootstrapModule (): void {
  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.log(err));
}

if (window.WebComponents.ready) {
  // Web Components are ready
  bootstrapModule();
} else {
  // Wait for polyfills to load
  window.addEventListener('WebComponentsReady', bootstrapModule);
}
