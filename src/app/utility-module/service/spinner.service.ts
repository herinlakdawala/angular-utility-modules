import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class SpinnerService {
  spinnerEvent: EventEmitter<Object> = new EventEmitter<Object>();
  spinnerStatus = { };
  constructor() { }

  show(target: string) {
    this.spinnerStatus[target] = true;
    this.spinnerEvent.emit({
      display: true,
      target
    });
  }

  hide(target: string) {
    this.spinnerStatus[target] = false;
    this.spinnerEvent.emit({
      display: false,
      target
    });
  }
}
