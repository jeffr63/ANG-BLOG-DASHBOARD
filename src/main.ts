import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { DefaultDataServiceConfig, EntityDataModule } from '@ngrx/data';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ToastrModule } from 'ngx-toastr';

import AppComponent from './app/app.component';
import { APP_ROUTES } from './app/app.routing';
import { entityConfig } from './app/entity-metadata';

const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: 'http://localhost:3000',
  timeout: 3000, // request timeout
};

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      ToastrModule.forRoot(),
      StoreModule.forRoot({}),
      EffectsModule.forRoot([]),
      EntityDataModule.forRoot(entityConfig)
    ),
    { provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig },
    provideAnimations(),
    provideHttpClient(),
    provideRouter(APP_ROUTES),
  ],
}).catch((err) => console.error(err));
