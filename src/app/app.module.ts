import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {UtilityLibraryModule} from './utility-module/utility-module.module';
import {EnvironmentService} from "./utility-module/service/environment.service";
import {LocaleService} from "./utility-module/service/locale.service";
import {ErrorHandlerService} from "./utility-module/service/error-handler.service";
import {SpinnerService} from "./utility-module/service/spinner.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {CustomHttpInterceptorService} from "./utility-module/service/custom-http-interceptor.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    UtilityLibraryModule
  ],
  providers: [
    EnvironmentService,
    LocaleService,
    SpinnerService,
    ErrorHandlerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptorService,
      multi: true,
    }
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
