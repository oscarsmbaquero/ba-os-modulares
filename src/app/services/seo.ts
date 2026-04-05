import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private title = inject(Title);
  private meta = inject(Meta);
  private document = inject(DOCUMENT);

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

    this.meta.updateTag({ name: 'description', content: config.description });
    if (config.keywords) {
      this.meta.updateTag({ name: 'keywords', content: config.keywords });
    }

    // Open Graph
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    this.meta.updateTag({ property: 'og:type', content: config.type || 'website' });
    if (config.image) {
      this.meta.updateTag({ property: 'og:image', content: config.image });
    }
    if (config.url) {
      this.meta.updateTag({ property: 'og:url', content: config.url });
    }

    // Twitter
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: config.description });
    if (config.image) {
      this.meta.updateTag({ name: 'twitter:image', content: config.image });
    }
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
