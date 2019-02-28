import {Inject, Renderer2} from '@angular/core';
import {DOCUMENT} from '@angular/common';

export class TaggingService {

  constructor( @Inject(DOCUMENT) private readonly document: any) {
  }

  public setTag(renderer2: Renderer2, url: string): void {
    let tag = renderer2.createElement('script');
    tag.src = url;
    tag.setAttribute('async', '');
    renderer2.appendChild(this.document.head, tag);
  }

  public setMetaInfo(renderer2: Renderer2, pageName: string, siteName: string, language: string,
                     country: string, region: string): void {
    let tag = renderer2.createElement('script');
    let childName = document.createTextNode('var pageName= "' + pageName + '"\n' + 'var sitesiteName= "' + siteName + '"\n'
      + 'var language= "' + language + '"\n' + 'var country= "' + country + '"\n' + 'var region= "' + region + '"');
    tag.appendChild(childName);
    renderer2.appendChild(this.document.head, tag);
  }
}
