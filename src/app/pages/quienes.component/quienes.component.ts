import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SeoService } from '../../services/seo';

@Component({
  selector: 'app-quienes',
  standalone: true,
  imports: [RouterLink, MatIconModule],
  templateUrl: './quienes.component.html'
})
export class QuienesComponent implements OnInit {
  private seoService = inject(SeoService);

  ngOnInit() {
    this.seoService.updateMetadata({
      title: 'Quiénes Somos — Experiencia en Construcción Modular',
      description: 'Conozca al equipo de 2IBM. Más de 30 años de experiencia combinada en construcción y fabricación de baños modulares industriales en Plasencia, Cáceres.',
      keywords: 'equipo 2IBM, historia 2IBM, construcción modular Cáceres, baños industriales España, valores 2IBM',
      type: 'website'
    });
  }
}
