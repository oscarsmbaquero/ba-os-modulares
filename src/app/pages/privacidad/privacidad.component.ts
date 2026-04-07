import { Component, OnInit, inject } from '@angular/core';
import { SeoService } from '../../services/seo';

@Component({
  selector: 'app-privacidad',
  standalone: true,
  templateUrl: './privacidad.component.html',
})
export class PrivacidadComponent implements OnInit {
  private seoService = inject(SeoService);

  ngOnInit() {
    this.seoService.updateMetadata({
      title: 'Politica de privacidad',
      description:
        'Politica de privacidad de 2IBM sobre el tratamiento de datos personales, derechos de las personas usuarias y vias de contacto.',
      keywords: 'privacidad 2IBM, proteccion de datos, RGPD 2IBM',
      type: 'website',
    });
  }
}