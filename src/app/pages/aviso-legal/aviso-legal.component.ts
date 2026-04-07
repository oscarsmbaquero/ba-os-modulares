import { Component, OnInit, inject } from '@angular/core';
import { SeoService } from '../../services/seo';

@Component({
  selector: 'app-aviso-legal',
  standalone: true,
  templateUrl: './aviso-legal.component.html',
})
export class AvisoLegalComponent implements OnInit {
  private seoService = inject(SeoService);

  ngOnInit() {
    this.seoService.updateMetadata({
      title: 'Aviso legal',
      description:
        'Aviso legal de 2IBM con la informacion de identificacion del titular, condiciones de uso del sitio web y responsabilidades.',
      keywords: 'aviso legal 2IBM, condiciones de uso, titular web 2IBM',
      type: 'website',
    });
  }
}