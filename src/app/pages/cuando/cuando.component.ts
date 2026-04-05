import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SeoService } from '../../services/seo';

@Component({
  selector: 'app-cuando',
  standalone: true,
  imports: [RouterLink, MatIconModule],
  templateUrl: './cuando.component.html'
})
export class CuandoComponent implements OnInit {
  private seoService = inject(SeoService);

  ngOnInit() {
    this.seoService.updateMetadata({
      title: 'Cuándo — Plazos y Eficiencia Temporal',
      description: 'Reduzca los plazos de obra hasta un 70% con 2IBM. Conozca nuestras fases de trabajo y el compromiso de entrega Just-in-Time.',
      keywords: 'plazos construcción modular, eficiencia temporal obra, cronograma 2IBM, entrega rápida baños',
      type: 'website'
    });
  }
}
