import { Component, signal, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AiBotComponent } from '../../components/ai-bot.component/ai-bot.component';
import { FormsModule } from '@angular/forms';
import { SeoService } from '../../services/seo';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [MatIconModule, AiBotComponent, FormsModule],
  templateUrl: './contacto.component.html',
})
export class ContactoComponent implements OnInit {
  private seoService = inject(SeoService);

  isSubmitting = signal(false);
  isSuccess = signal(false);
  
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

  onSubmit(event: Event) {
    event.preventDefault();
    
    if (!this.formData.nombre || !this.formData.email || !this.formData.mensaje) {
      return;
    }

    this.isSubmitting.set(true);
    
    // Simulate API call
    setTimeout(() => {
      this.isSubmitting.set(false);
      this.isSuccess.set(true);
    }, 1500);
  }

  resetForm() {
    this.isSuccess.set(false);
    this.formData = {
      nombre: '',
      empresa: '',
      email: '',
      mensaje: ''
    };
  }
}
