import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SeoService } from '../../services/seo';

@Component({
  selector: 'app-donde',
  standalone: true,
  imports: [RouterLink, MatIconModule],
  templateUrl: './donde.component.html'
})
export class DondeComponent implements OnInit {
  private seoService = inject(SeoService);

  ngOnInit() {
    this.seoService.updateMetadata({
      title: 'Dónde Estamos — Logística y Alcance Nacional',
      description: 'Nuestra fábrica en Plasencia, Cáceres, nos permite distribuir baños modulares en toda España. Logística eficiente y montaje especializado.',
      keywords: 'fábrica 2IBM, Plasencia Cáceres, logística construcción modular, distribución baños España',
      type: 'website'
    });

    this.seoService.setStructuredData({
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      'name': '2IBM — Industrial Ibérica de Baños Modulares',
      'image': 'https://2ibm.es/favicon.svg',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'C/ Alfonso Camargo, 16',
        'addressLocality': 'Plasencia',
        'addressRegion': 'Cáceres',
        'postalCode': '10600',
        'addressCountry': 'ES'
      },
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': 40.0333,
        'longitude': -6.0833
      },
      'telephone': '+34 927 41 00 00'
    });
  }
}
