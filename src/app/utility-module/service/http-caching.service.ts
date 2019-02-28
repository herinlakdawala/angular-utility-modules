import {HttpClient, HttpParams, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map, shareReplay} from 'rxjs/operators';

@Injectable ()
export class HttpCachingService {
  private cacheMap: Map<HttpRequest<any>, HttpResponse<any>> = new Map<HttpRequest<any>, HttpResponse<any>>();
  private getApiResponse: any;
  private postApiResponse: any;
  constructor (private readonly http: HttpClient) { }

  httpGetResponse (requestUrl: string, requestParameters?: HttpParams): any {
    const cachedResponse = this.get (requestUrl + requestParameters);
    if (cachedResponse) {
      this.getApiResponse = cachedResponse;
    } else {
      this.getApiResponse = this.http.get<any> (requestUrl, {params: requestParameters}).pipe(
        map ((response: any) => response)).pipe(shareReplay());
      this.put (requestUrl + requestParameters, this.getApiResponse);
    }
    return this.getApiResponse;
  }

  httpPostResponse (requestUrl: string, requestBody: any | null, requestParameters?: HttpParams): any {
    const cachedResponse = this.get (requestUrl + requestParameters);
    if (cachedResponse) {
      this.postApiResponse = cachedResponse;
    } else {
      this.postApiResponse = this.http.post<any> (requestUrl, requestBody, {params: requestParameters}).pipe(
        map ((response: any) => response)).pipe(shareReplay());
      this.put (requestUrl + requestParameters, this.postApiResponse);
    }
    return this.postApiResponse;
  }

  /**
   * Returns a cached response, if any, or null if not present.
   */
  private get (request: any): HttpResponse<any> | null {
    return this.cacheMap.get (request);
  }

  /**
   * Adds or updates the response in the cache.
   */
  private put (request: any, response: HttpResponse<any>): void {
    this.cacheMap.set (request, response);
  }

  /**
   * Clears the Cache
   */
  public clearCache (request?: any) {
    if (request && !Array.isArray (request)) {
      this.cacheMap.delete (request);
    } else if (Array.isArray (request) && request.length > 0) {
      let key;
      for (key of request) {
        this.cacheMap.delete (key);
      }
    } else {
      this.cacheMap = new Map<HttpRequest<any>, HttpResponse<any>> ();
    }
  }

  /**
   * Clears the Cache all except the incoming requests
   */
  public clearCacheExcept (request: any) {
    if (request && !Array.isArray (request)) {
      const obj = this.cacheMap.get(request);
      this.cacheMap = new Map<HttpRequest<any>, HttpResponse<any>> ();
      this.cacheMap.set(request, obj);
    } else {
      const cacheMapClone: Map<HttpRequest<any>, HttpResponse<any>> = new Map<HttpRequest<any>, HttpResponse<any>>();
      let key;
      for (key of request) {
        cacheMapClone.set(key, this.cacheMap.get(key));
      }
      this.cacheMap = cacheMapClone;
    }
  }
}
