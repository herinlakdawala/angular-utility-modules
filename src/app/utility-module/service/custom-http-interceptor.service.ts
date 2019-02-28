import {Injectable, Injector} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ErrorHandlerService} from './error-handler.service';
import {CONFIG_CONSTANTS} from '../constants/common-constants';
import {ConfigService} from './config.service';
import {tap} from 'rxjs/internal/operators';
import * as uuid from 'uuid';

@Injectable ()
export class CustomHttpInterceptorService implements HttpInterceptor{

  constructor (private readonly errorHandler: ErrorHandlerService, private readonly injector: Injector) { }

  intercept (inputRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const updatedInputRequest = inputRequest.clone ({
      setHeaders: {
        'Correlation-ID': this.randomId()
      }});
    return next.handle (updatedInputRequest).pipe (
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.redirectToLocation(event);
        }
      }, (error: any) => {
        if (error instanceof HttpErrorResponse) {
          this.showError(error);
        }
      })
    );
  }

  private redirectToLocation (event) {
    const configService = this.injector.get(ConfigService);
    if (event && event.body && this.isJson (event.body)) {
      const data = this.fromJson (event.body);
      if (data['tamOp'] && data['tamOp'] === 'token_login') { // && !exemptUrls()
        document.cookie = 'lastValidActivity=;expires=Thu, 01-Jan-1970 00:00:01 GMT;path=/;secure=;';
        window.location.href = configService.getConfigByKey (CONFIG_CONSTANTS.REDIRECT_TO_GOOGLE);
      }
      const isPublicApi = event.url.includes ('public');
      const isPublicTemplate = window.location.href.includes ('/public/');
      if (!isPublicApi && !isPublicTemplate) {
        const date = new Date ();
        date.setTime (date.getTime () + (2 * 60 * 60 * 1000) + (5 * 60 * 1000));
        const expires = '; expires=' + date.toDateString;
        document.cookie = `lastValidActivity=${new Date ()};path=/${expires}`;
      }
    }
  }

  private showError (error) {
    if (error.status !== 302 && (error.status < 200 || error.status > 300)) {
      const errorDetails = {
        title: 'common.error.serviceCall.title',
        description: 'common.error.serviceCall.description',
        actions: [
          {
            text: 'common.label.ok',
            callback () {},
            isPrimary: true
          }
        ]
      };
      this.errorHandler.setMessage.emit (errorDetails);
    }
  }

  private isString (value) {
    return typeof value === 'string';
  }

  private fromJson (json) {
    return this.isString (json) ? JSON.parse (json) : json;
  }

  private isJson (data) {
    try {
      this.fromJson (data);
    } catch (e) {
      return false;
    }
    return true;
  }

  private randomId(): string {
    return uuid.v4();
  }
}
