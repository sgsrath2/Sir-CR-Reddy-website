import { ApplicationConfig } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app-routing.module';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { PathLocationStrategy } from '@angular/common';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
// withHashLocation()
export const appConfig: ApplicationConfig = {
    providers: [provideRouter(routes,), provideClientHydration(), provideAnimations(),provideHttpClient(), provideAnimationsAsync()]
};