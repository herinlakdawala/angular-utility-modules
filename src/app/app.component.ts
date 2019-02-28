import {Component, OnInit, Renderer2} from '@angular/core';
import {ConfigService} from './utility-module/service/config.service';
import {ErrorHandlerService} from './utility-module/service/error-handler.service';
import {SpinnerService} from './utility-module/service/spinner.service';
import {LocaleService} from './utility-module/service/locale.service';

const loadingSpinnerAppComponent = 'LOADING-APPLICATION';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string ;
  locale: string;

  constructor (private readonly configService: ConfigService,
               private readonly spinnerService: SpinnerService,
               private readonly localeService: LocaleService,
               private readonly renderer2: Renderer2,
               private readonly errorHandler: ErrorHandlerService) { }

  ngOnInit () {
    this.spinnerService.show(loadingSpinnerAppComponent);


    setTimeout (() => {
      //alert ("Hello from setTimeout");
      /*this.localeService.getLocaleConstant().then((locale) => {
        this.locale = locale;
        //alert(this.locale);
        //this.spinnerService.hide(loadingSpinnerAppComponent);
      });*/
      this.title = 'angular-seven-library';
    }, 1000);
  }
}
