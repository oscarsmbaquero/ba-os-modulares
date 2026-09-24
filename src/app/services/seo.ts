import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

const SITE_URL = 'https://www.2ibm.es';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private title = inject(Title);
  private meta = inject(Meta);
  private document = inject(DOCUMENT);
  private router = inject(Router);

  updateMetadata(config: {
    title: string;
    description: string;
    keywords?: string;
    type?: string;
    image?: string;
    url?: string;
  }) {
    const fullTitle = `${config.title} | 2IBM — Industrial de Baños Modulares`;
    this.title.setTitle(fullTitle);

    const canonicalUrl = config.url ?? `${SITE_URL}${this.router.url === '/' ? '' : this.router.url}`;

    this.meta.updateTag({ name: 'description', content: config.description });
    if (config.keywords) {
      this.meta.updateTag({ name: 'keywords', content: config.keywords });
    }

    // Open Graph
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    this.meta.updateTag({ property: 'og:type', content: config.type || 'website' });
    this.meta.updateTag({ property: 'og:url', content: canonicalUrl });
    if (config.image) {
      this.meta.updateTag({ property: 'og:image', content: config.image });
    }

    // Twitter
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: config.description });
    if (config.image) {
      this.meta.updateTag({ name: 'twitter:image', content: config.image });
    }

    this.updateCanonicalLink(canonicalUrl);
  }

  private updateCanonicalLink(url: string) {
    let link = this.document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  setStructuredData(data: Record<string, unknown>) {
    const script = this.document.getElementById('structured-data') as HTMLScriptElement;
    if (script) {
      script.text = JSON.stringify(data);
    } else {
      const newScript = this.document.createElement('script');
      newScript.id = 'structured-data';
      newScript.type = 'application/ld+json';
      newScript.text = JSON.stringify(data);
      this.document.head.appendChild(newScript);
    }
  }
}
