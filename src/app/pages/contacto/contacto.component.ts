import { Component, signal, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AiBotComponent } from '../../components/ai-bot.component/ai-bot.component';
import { FormsModule } from '@angular/forms';
import { SeoService } from '../../services/seo';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [MatIconModule, AiBotComponent, FormsModule, RevealDirective],
  templateUrl: './contacto.component.html',
})
export class ContactoComponent implements OnInit {
  private seoService = inject(SeoService);

  isSubmitting = signal(false);
  isSuccess = signal(false);
  isError = signal(false);

  formData = {
    nombre: '',
    empresa: '',
    email: '',
    mensaje: ''
  };

  ngOnInit() {
    this.seoService.updateMetadata({
      title: 'Contacto — Solicite Presupuesto',
      description: 'Contacte con 2IBM para su próximo proyecto de construcción modular. Solicite presupuesto o hable con nuestro asistente virtual.',
      keywords: 'contacto 2IBM, presupuesto baños modulares, oficina 2IBM Plasencia, atención al cliente 2IBM',
      type: 'website'
    });
  }

  async onSubmit(event: Event) {
    event.preventDefault();

    if (!this.formData.nombre || !this.formData.email || !this.formData.mensaje) {
      return;
    }

    this.isSubmitting.set(true);
    this.isError.set(false);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.formData)
      });

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      this.isSuccess.set(true);
    } catch (error) {
      console.error('Error sending contact form:', error);
      this.isError.set(true);
    } finally {
      this.isSubmitting.set(false);
    }
  }

  resetForm() {
    this.isSuccess.set(false);
    this.isError.set(false);
    this.formData = {
      nombre: '',
      empresa: '',
      email: '',
      mensaje: ''
    };
  }
}
