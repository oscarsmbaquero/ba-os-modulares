import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SeoService } from '../../services/seo';
import { CounterAnimationService } from '../../services/counter-animation';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, MatIconModule],
  templateUrl: 'home.componet.html'
})
export class HomeComponent implements OnInit {
  private seoService = inject(SeoService);
  private counterAnimationService = inject(CounterAnimationService);

  timeReduction = signal(0);
  qualityControl = signal(0);
  experienceYears = signal(0);

  ngOnInit() {
    this.seoService.updateMetadata({
      title: 'Construcción Industrializada de Baños Modulares',
      description: 'Fabricamos baños modulares completos en entorno industrial controlado. Eficiencia, calidad y precisión industrial para promotoras e inversores en España.',
      keywords: 'baños modulares, construcción industrializada, núcleos húmedos, 2IBM, Plasencia, Cáceres, construcción modular España',
      type: 'website'
    });

    this.seoService.setStructuredData({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      'name': '2IBM — Industrial Ibérica de Baños Modulares',
      'url': 'https://2ibm.es',
      'logo': 'https://2ibm.es/favicon.svg',
      'description': 'Líderes en construcción modular de baños industriales de alta precisión.',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'C/ Alfonso Camargo, 16',
        'addressLocality': 'Plasencia',
        'addressRegion': 'Cáceres',
        'postalCode': '10600',
        'addressCountry': 'ES'
      },
      'contactPoint': {
        '@type': 'ContactPoint',
        'telephone': '+34 927 41 00 00',
        'contactType': 'customer service',
        'email': 'info@2ibm.es'
      }
    });

    this.startStatsCounters();
  }

  private startStatsCounters() {
    this.counterAnimationService.animateTo(70, this.timeReduction);
    this.counterAnimationService.animateTo(100, this.qualityControl);
    this.counterAnimationService.animateTo(30, this.experienceYears);
  }
}
