import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SeoService } from '../../services/seo';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-que',
  standalone: true,
  imports: [RouterLink, MatIconModule, RevealDirective],
  templateUrl: 'que.component.html'
})
export class QueComponent implements OnInit {
  private seoService = inject(SeoService);

  ngOnInit() {
    this.seoService.updateMetadata({
      title: 'Soluciones Modulares a Medida — Catálogo',
      description: 'Descubra nuestras soluciones de baños modulares para hoteles, residencias y hospitales. Calidad certificada y diseño personalizado.',
      keywords: 'baños hoteles, baños residencias, baños hospitales, núcleos húmedos industrializados, catálogo 2IBM',
      type: 'website'
    });

    this.seoService.setStructuredData({
      '@context': 'https://schema.org',
      '@type': 'Service',
      'serviceType': 'Fabricación de Baños Modulares',
      'provider': {
        '@type': 'Organization',
        'name': '2IBM'
      },
      'areaServed': 'ES',
      'description': 'Diseño y fabricación de núcleos húmedos industrializados para diversos sectores.'
    });
  }
}
