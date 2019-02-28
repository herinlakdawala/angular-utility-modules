import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable ()
export class ConfigService {
  private config: Object;
  private confPromise: Promise<Object>;
  constructor (private readonly http: HttpClient) { }

  getConfPromise (): Promise<Object> {
    if (!this.confPromise) {
      this.confPromise = new Promise ((resolve) => {
        const url = 'config.json?' + new Date().getTime();
        this.http.get (url).pipe(map (res => res))
          .subscribe (config => {
            this.config = config;
            resolve ();
          });
      });
    }
    return this.confPromise;
  }

  /** method for getting config by key inside component*/
  getConfigByKey (key: string): any | undefined {
    if(!this.config) {
      this.getConfPromise().then((config) => {
        this.config = config;
        return this.getValueFromObj(this.config, key);
      });
    } else {
      return this.getValueFromObj(this.config, key);
    }
  }

  private getValueFromObj(obj, key): any|undefined {
    const arr = key.split('.');
    const k = arr[0];
    arr.shift();
    const next = arr.join('.');
    if (next !== '') {
      return this.getValueFromObj (obj[k], next);
    } else {
      return obj[k];
    }
  }

  /** method for getting config by key inside service*/
  public getCongfigByKeyPromise (key: string): Promise<string> {
    return new Promise<string>((resolve) => {
      this.getConfPromise().then( () => {
        resolve(this.getConfigByKey(key));
      });
    });
  }
}
