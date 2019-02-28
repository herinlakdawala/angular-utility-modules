import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from './config.service';
import {CONFIG_CONSTANTS} from '../constants/common-constants';

@Injectable ()
export class LocaleService  {
  constructor (private readonly http: HttpClient,
               private readonly configService: ConfigService) { }

  getLocaleConstant (): Promise<string> {
    return this.configService.getCongfigByKeyPromise (CONFIG_CONSTANTS.I18N_LOCALE_CONST).then ((localeConst) => {
      if (window.localStorage['NG_TRANSLATE_LANG_KEY']) {
        return window.localStorage['NG_TRANSLATE_LANG_KEY'];
      } else if (localeConst &&  localeConst !== '') {
        return localeConst;
      } else {
        return 'en-us';
      }
    });
  }

  getLocaleUrl (): Promise<string> {
    return this.configService.getCongfigByKeyPromise (CONFIG_CONSTANTS.I18N_LOCALE_URL).then ((localeUrl) => {
      return localeUrl;
    });
  }
}
