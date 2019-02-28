import {EventEmitter, Injectable} from '@angular/core';

@Injectable ()
export class ErrorHandlerService {
  constructor () { }
  setMessage = new EventEmitter ();
  showMessage = new EventEmitter ();
}
