import {Injectable} from '@angular/core';
import {ConfigService} from './config.service';
import {HttpClient} from '@angular/common/http';
import {CONFIG_CONSTANTS} from '../constants/common-constants';

@Injectable()
export class EnvironmentService {

  constructor (private readonly configService: ConfigService, private readonly http?: HttpClient) { }

  getEnvPromise() {
    return this.configService.getCongfigByKeyPromise(CONFIG_CONSTANTS.APP_ENVIRONMENT);
  }

  getEnv() {
    return this.configService.getConfigByKey(CONFIG_CONSTANTS.APP_ENVIRONMENT);
  }
}
