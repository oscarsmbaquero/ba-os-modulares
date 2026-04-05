import { Component, signal, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AiBotComponent } from '../../components/ai-bot/ai-bot';
import { FormsModule } from '@angular/forms';
import { SeoService } from '../../services/seo';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [MatIconModule, AiBotComponent, FormsModule],
  template: `
    <div class="min-h-screen bg-surface">
      <!-- Hero Section -->
      <div class="relative bg-gradient-to-br from-primary to-primary-container text-white overflow-hidden">
        <div class="absolute inset-0 opacity-20">
          <img src="https://picsum.photos/seed/contact-office/1920/1080?blur=2" alt="Oficinas" referrerpolicy="no-referrer" class="w-full h-full object-cover mix-blend-overlay" />
        </div>
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div class="max-w-3xl">
            <div class="inline-flex items-center gap-2 px-3 py-1 bg-on-tertiary-container rounded-sm mb-8">
              <span class="text-[0.65rem] font-bold text-white tracking-widest uppercase">Atención al Cliente</span>
            </div>
            <h1 class="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 !text-white leading-[1.1] tracking-tight">
              HABLEMOS DE <br/>
              <span class="text-on-tertiary-container uppercase">SU PROYECTO.</span>
            </h1>
            <p class="text-lg text-slate-300 leading-relaxed max-w-xl">
              Estamos aquí para resolver sus dudas y estudiar la viabilidad de la industrialización en su próxima promoción. Contacte con nuestro equipo técnico y comercial.
            </p>
          </div>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Contact Info & Form -->
          <div class="bg-surface-container-lowest shadow-ambient border border-outline-variant/20 p-8 md:p-12 relative overflow-hidden">
            <div class="absolute -right-10 -top-10 opacity-5">
              <mat-icon class="text-[200px]">support_agent</mat-icon>
            </div>
            <h2 class="text-2xl font-display font-bold text-primary mb-8 relative z-10 uppercase tracking-wide">Información de Contacto</h2>
            
            <div class="space-y-8 mb-12 relative z-10">
              <div class="flex items-start gap-4 group">
                <div class="w-12 h-12 bg-surface border border-outline-variant/20 text-primary flex items-center justify-center shrink-0 transition-colors group-hover:bg-primary group-hover:text-white shadow-sm">
                  <mat-icon>location_on</mat-icon>
                </div>
                <div>
                  <h3 class="font-bold text-primary mb-1">Fábrica y Oficinas Centrales</h3>
                  <p class="text-sm text-on-surface-variant leading-relaxed">C/ Alfonso Camargo, 16<br>10600 Plasencia (Cáceres)</p>
                </div>
              </div>
              
              <div class="flex items-start gap-4 group">
                <div class="w-12 h-12 bg-surface border border-outline-variant/20 text-primary flex items-center justify-center shrink-0 transition-colors group-hover:bg-primary group-hover:text-white shadow-sm">
                  <mat-icon>phone</mat-icon>
                </div>
                <div>
                  <h3 class="font-bold text-primary mb-1">Teléfono</h3>
                  <p class="text-sm text-on-surface-variant leading-relaxed">+34 927 41 00 00</p>
                </div>
              </div>
              
              <div class="flex items-start gap-4 group">
                <div class="w-12 h-12 bg-surface border border-outline-variant/20 text-primary flex items-center justify-center shrink-0 transition-colors group-hover:bg-primary group-hover:text-white shadow-sm">
                  <mat-icon>email</mat-icon>
                </div>
                <div>
                  <h3 class="font-bold text-primary mb-1">Email</h3>
                  <p class="text-sm text-on-surface-variant leading-relaxed">info&#64;2ibm.es</p>
                </div>
              </div>
            </div>

            <div class="h-px bg-outline-variant/30 mb-8 relative z-10"></div>

            <h2 class="text-2xl font-display font-bold text-primary mb-6 relative z-10 uppercase tracking-wide">Envíenos un mensaje</h2>
            
            @if (isSuccess()) {
              <div class="bg-surface border border-emerald-500/30 p-8 shadow-sm flex flex-col items-center text-center relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div class="w-16 h-16 bg-emerald-500/10 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                  <mat-icon class="text-4xl w-10 h-10">check_circle</mat-icon>
                </div>
                <h3 class="text-xl font-display font-bold text-primary mb-2">¡Mensaje enviado con éxito!</h3>
                <p class="text-sm text-on-surface-variant mb-6">Gracias por contactar con 2IBM. Nuestro equipo comercial se pondrá en contacto con usted a la mayor brevedad posible.</p>
                <button (click)="resetForm()" class="px-6 py-3 bg-surface border border-outline-variant/30 text-primary text-xs font-bold uppercase tracking-widest hover:bg-surface-container-low transition-colors">
                  Enviar otro mensaje
                </button>
              </div>
            } @else {
              <form class="space-y-6 relative z-10" (submit)="onSubmit($event)">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label for="nombre" class="block text-xs font-bold text-primary mb-2 uppercase tracking-widest">Nombre</label>
                    <input id="nombre" name="nombre" [(ngModel)]="formData.nombre" required type="text" class="w-full bg-surface border border-outline-variant/30 px-4 py-3 focus:ring-2 focus:ring-on-tertiary-container focus:border-transparent outline-none transition-shadow text-on-surface placeholder-on-surface-variant/50 text-sm" placeholder="Su nombre">
                  </div>
                  <div>
                    <label for="empresa" class="block text-xs font-bold text-primary mb-2 uppercase tracking-widest">Empresa</label>
                    <input id="empresa" name="empresa" [(ngModel)]="formData.empresa" type="text" class="w-full bg-surface border border-outline-variant/30 px-4 py-3 focus:ring-2 focus:ring-on-tertiary-container focus:border-transparent outline-none transition-shadow text-on-surface placeholder-on-surface-variant/50 text-sm" placeholder="Su empresa">
                  </div>
                </div>
                <div>
                  <label for="email" class="block text-xs font-bold text-primary mb-2 uppercase tracking-widest">Email</label>
                  <input id="email" name="email" [(ngModel)]="formData.email" required type="email" class="w-full bg-surface border border-outline-variant/30 px-4 py-3 focus:ring-2 focus:ring-on-tertiary-container focus:border-transparent outline-none transition-shadow text-on-surface placeholder-on-surface-variant/50 text-sm" placeholder="correo@empresa.com">
                </div>
                <div>
                  <label for="mensaje" class="block text-xs font-bold text-primary mb-2 uppercase tracking-widest">Mensaje</label>
                  <textarea id="mensaje" name="mensaje" [(ngModel)]="formData.mensaje" required rows="4" class="w-full bg-surface border border-outline-variant/30 px-4 py-3 focus:ring-2 focus:ring-on-tertiary-container focus:border-transparent outline-none transition-shadow text-on-surface placeholder-on-surface-variant/50 text-sm resize-none" placeholder="¿En qué podemos ayudarle?"></textarea>
                </div>
                <button type="submit" [disabled]="isSubmitting()" class="w-full bg-primary text-white font-bold py-4 px-6 hover:bg-primary-container transition-colors flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed uppercase tracking-widest text-sm">
                  @if (isSubmitting()) {
                    <mat-icon class="animate-spin">autorenew</mat-icon>
                    <span>Enviando...</span>
                  } @else {
                    <span>Enviar Mensaje</span>
                    <mat-icon class="text-on-tertiary-container group-hover:translate-x-1 transition-transform">send</mat-icon>
                  }
                </button>
              </form>
            }
          </div>

          <!-- AI Bot -->
          <div class="flex flex-col h-full">
            <div class="mb-8">
              <h2 class="text-2xl font-display font-bold text-primary mb-3 uppercase tracking-wide">¿Tiene dudas rápidas?</h2>
              <p class="text-sm text-on-surface-variant leading-relaxed">Pregunte a nuestro asistente virtual impulsado por IA. Conoce todos los detalles sobre nuestros procesos y productos.</p>
            </div>
            <div class="flex-1 bg-surface-container-lowest shadow-ambient border border-outline-variant/20 overflow-hidden flex flex-col min-h-[500px]">
              <app-ai-bot class="flex-1 flex flex-col"></app-ai-bot>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
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
