import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SeoService } from '../../services/seo';

@Component({
  selector: 'app-como',
  standalone: true,
  imports: [RouterLink, MatIconModule],
  templateUrl: './como.component.html',
})
export class ComoComponent implements OnInit {
  private seoService = inject(SeoService);

  ngOnInit() {
    this.seoService.updateMetadata({
      title: 'Cómo Trabajamos — Metodología Industrializada',
      description: 'Descubra el proceso 2IBM: desde el diseño BIM hasta la instalación Plug & Play en obra. Eficiencia y control total del proceso.',
      keywords: 'proceso 2IBM, metodología construcción modular, diseño BIM, fabricación industrializada, logística construcción',
      type: 'website'
    });
  }
}
