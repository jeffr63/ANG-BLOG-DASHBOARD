import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import AppComponent from './app/app.component';
import { APP_ROUTES } from './app/app.routing';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideHttpClient(),
    provideRouter(APP_ROUTES),
  ],
}).catch((err) => console.error(err));

