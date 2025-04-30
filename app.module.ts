import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgxScrollTopModule } from 'ngx-scrolltop';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ApiserviceService } from './services/apiservice.service';
import { NgSelectOption } from '@angular/forms';

@NgModule({
    declarations: [],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        NgxScrollTopModule, HttpClientModule, NgSelectOption, CommonModule, CommonModule
    ],
    providers: [{ provide: LocationStrategy, useClass: PathLocationStrategy }, {
        // APP_INITIALIZER is the Angular dependency injection token.
        provide: APP_INITIALIZER,
        // Pass in the AGM dependency injection token.
        deps: [ApiserviceService],
        // Allow for multiple startup injectors if needed.
        multi: true,
        // UseFactory provides Angular with the function to invoke.
        useFactory: (initializer: ApiserviceService) => () => initializer.initialize(),
    }],
    bootstrap: []
})
export class AppModule { }