import {APP_INITIALIZER, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {ConfigService} from './service/config.service';
import {SpinnerService} from './service/spinner.service';
import {EnvironmentService} from './service/environment.service';
import {LocaleService} from './service/locale.service';
import {MessagePopupComponent} from './component/message-popup/message-popup.component';
import {SpinnerComponent} from './component/spinner/spinner.component';
import {ModalModule} from 'ngx-bootstrap';

export function configLoader (configService: ConfigService) {
  let result;
  result = () => configService.getConfPromise ();
  return result;
}

export function HttpLoaderFactory (http: HttpClient) {
  return new TranslateHttpLoader (http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [MessagePopupComponent, SpinnerComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ModalModule.forRoot(),
    TranslateModule.forRoot ({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [ HttpClient ]
      }
    })
  ],
  providers: [
    ConfigService,
    SpinnerService,
    { provide: APP_INITIALIZER,
      useFactory: configLoader,
      deps: [
        ConfigService
      ],
      multi: true
    }
  ],
  exports: []
})
export class UtilityLibraryModule {
  localeUrl: string;
  localeConstant: string;
  constructor (private readonly environmentService: EnvironmentService,
               private readonly configService: ConfigService,
               private readonly localeService: LocaleService,
               private readonly translate: TranslateService,
               private readonly http: HttpClient) {

    this.localeService.getLocaleUrl ().then ((localeUrl) => {
      this.localeUrl = localeUrl;
    });
    this.localeService.getLocaleConstant ().then ((localeConstant) => {
      this.localeConstant = localeConstant;
      if (this.localeUrl && this.localeUrl !== '') {
        let translateObj: Object;
        this.localeUrl = this.localeUrl.replace (new RegExp ('{locale}', 'g'), localeConstant);
        this.http.get (this.localeUrl).subscribe ((res: Response) => {
          translateObj = res.json ();
          this.translate.setTranslation (localeConstant, translateObj);
          this.translate.use (localeConstant);
        });
      } else {
        this.translate.setDefaultLang (this.localeConstant);
        this.translate.use (this.localeConstant);
      }
    });
  }
}
