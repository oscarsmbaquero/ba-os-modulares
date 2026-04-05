import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SeoService } from '../../services/seo';

@Component({
  selector: 'app-quienes',
  standalone: true,
  imports: [RouterLink, MatIconModule],
  template: `
    <div class="min-h-screen bg-surface">
      <!-- Hero Section -->
      <div class="relative bg-gradient-to-br from-primary to-primary-container text-white overflow-hidden">
        <div class="absolute inset-0 opacity-20">
          <img src="https://picsum.photos/seed/industrial-team/1920/1080?blur=2" alt="Equipo 2IBM" referrerpolicy="no-referrer" class="w-full h-full object-cover mix-blend-overlay" />
        </div>
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div class="max-w-3xl">
            <div class="inline-flex items-center gap-2 px-3 py-1 bg-on-tertiary-container rounded-sm mb-8">
              <span class="text-[0.65rem] font-bold text-white tracking-widest uppercase">Nuestra Misión</span>
            </div>
            <h1 class="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 !text-white leading-[1.1] tracking-tight">
              LA CONSTRUCCIÓN <br/>
              DEL FUTURO <br/>
              <span class="text-on-tertiary-container uppercase">EMPIEZA EN FÁBRICA.</span>
            </h1>
            <p class="text-lg text-slate-300 leading-relaxed max-w-xl">
              2IBM es una empresa española dedicada a la fabricación de baños modulares completos, nacida con el objetivo de transformar el proceso tradicional de construcción mediante industrialización, control de calidad y rapidez de ejecución.
            </p>
          </div>
        </div>
        
        <!-- Floating Card -->
        <div class="absolute bottom-12 right-8 lg:right-24 z-20 hidden md:block max-w-xs">
          <div class="bg-white/5 backdrop-blur-xl border border-white/10 p-6 shadow-2xl">
            <h3 class="text-on-tertiary-container font-display font-bold text-lg mb-2 uppercase tracking-wide">Fundada en España</h3>
            <p class="text-xs text-slate-300 leading-relaxed">
              Equipo multidisciplinar con más de 30 años de experiencia combinada en construcción, fabricación y gestión de obra.
            </p>
          </div>
        </div>
      </div>

      <!-- Historia & Equipo -->
      <div class="py-24 bg-surface">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 class="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary mb-8 leading-tight">
                EXPERIENCIA INDUSTRIAL, VISIÓN DE FUTURO.
              </h2>
              <div class="space-y-6 text-on-surface-variant leading-relaxed">
                <p>
                  Fundada por un equipo con amplia experiencia en construcción, fabricación y gestión de obra, con más de 6 años de experiencia específica en construcción modular, 2IBM combina ingeniería avanzada, diseño funcional y producción eficiente en un modelo totalmente sostenible.
                </p>
                <p>
                  Nuestro compromiso con la innovación nos posiciona como referente en el sector de la construcción industrializada, ofreciendo soluciones que optimizan tiempos, costes y resultados finales para promotoras, constructoras e inversores del mercado español.
                </p>
              </div>
              
              <div class="mt-12 grid grid-cols-2 gap-8">
                <div class="flex flex-col">
                  <span class="text-4xl font-display font-bold text-on-tertiary-container mb-1">30+</span>
                  <span class="text-[0.65rem] font-bold tracking-widest uppercase text-on-surface-variant">Años de experiencia combinada</span>
                </div>
                <div class="flex flex-col">
                  <span class="text-4xl font-display font-bold text-on-tertiary-container mb-1">6+</span>
                  <span class="text-[0.65rem] font-bold tracking-widest uppercase text-on-surface-variant">Años en construcción modular</span>
                </div>
              </div>
            </div>
            
            <div class="bg-surface-container-low p-12 border border-outline-variant/30 relative overflow-hidden">
              <div class="absolute inset-0 blueprint-grid opacity-20"></div>
              <h3 class="text-xl font-display font-bold text-primary mb-8 uppercase tracking-widest border-b border-on-tertiary-container pb-4 inline-block">Nuestra experiencia</h3>
              <ul class="space-y-6 relative z-10">
                <li class="flex items-start gap-4">
                  <div class="w-6 h-6 bg-on-tertiary-container text-white flex items-center justify-center shrink-0 mt-1">
                    <mat-icon class="material-symbols-outlined text-sm w-4 h-4">check_circle</mat-icon>
                  </div>
                  <span class="text-sm font-medium text-primary">Equipo multidisciplinar con más de 30 años de experiencia combinada</span>
                </li>
                <li class="flex items-start gap-4">
                  <div class="w-6 h-6 bg-on-tertiary-container text-white flex items-center justify-center shrink-0 mt-1">
                    <mat-icon class="material-symbols-outlined text-sm w-4 h-4">check_circle</mat-icon>
                  </div>
                  <span class="text-sm font-medium text-primary">Conocimiento profundo del sector de la construcción tradicional e industrializada</span>
                </li>
                <li class="flex items-start gap-4">
                  <div class="w-6 h-6 bg-on-tertiary-container text-white flex items-center justify-center shrink-0 mt-1">
                    <mat-icon class="material-symbols-outlined text-sm w-4 h-4">check_circle</mat-icon>
                  </div>
                  <span class="text-sm font-medium text-primary">Capacidad de adaptación a las necesidades específicas de cada proyecto</span>
                </li>
                <li class="flex items-start gap-4">
                  <div class="w-6 h-6 bg-on-tertiary-container text-white flex items-center justify-center shrink-0 mt-1">
                    <mat-icon class="material-symbols-outlined text-sm w-4 h-4">check_circle</mat-icon>
                  </div>
                  <span class="text-sm font-medium text-primary">Compromiso con la calidad y la innovación constante</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Valores Fundamentales (Bento Grid) -->
      <div class="py-24 bg-surface-container-low border-y border-outline-variant/30">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="mb-16">
            <h2 class="text-3xl md:text-4xl font-display font-bold text-primary mb-4 uppercase tracking-wide">NUESTRA EXPERIENCIA Y VALORES</h2>
            <div class="w-12 h-0.5 bg-on-tertiary-container"></div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Capacidad de Adaptación (Large) -->
            <div class="md:col-span-2 bg-surface-container-lowest p-10 border border-outline-variant/20 shadow-ambient relative overflow-hidden group">
              <div class="absolute -right-8 -bottom-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <mat-icon class="material-symbols-outlined text-[160px]">architecture</mat-icon>
              </div>
              <h3 class="text-xl font-display font-bold text-primary mb-4 uppercase tracking-widest">Capacidad de Adaptación</h3>
              <p class="text-sm text-on-surface-variant leading-relaxed max-w-xl">
                Adaptamos cada módulo a las necesidades específicas de su proyecto. Desde VPO hasta hoteles de lujo, nuestros sistemas se configuran a medida para cada tipología y sector.
              </p>
            </div>

            <!-- Rapidez -->
            <div class="bg-surface-container-lowest p-10 border border-outline-variant/20 shadow-ambient relative overflow-hidden group">
              <div class="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <mat-icon class="material-symbols-outlined text-[120px]">speed</mat-icon>
              </div>
              <h3 class="text-xl font-display font-bold text-primary mb-4 uppercase tracking-widest">Rapidez</h3>
              <p class="text-sm text-on-surface-variant leading-relaxed">
                Reducimos los tiempos de obra hasta un 70% frente a la construcción tradicional, con fechas de entrega garantizadas y coordinación milimétrica con el cronograma de cada obra.
              </p>
            </div>

            <!-- Sostenibilidad -->
            <div class="bg-surface-container-lowest p-10 border border-outline-variant/20 shadow-ambient relative overflow-hidden group">
              <div class="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <mat-icon class="material-symbols-outlined text-[120px]">eco</mat-icon>
              </div>
              <h3 class="text-xl font-display font-bold text-primary mb-4 uppercase tracking-widest">Sostenibilidad</h3>
              <p class="text-sm text-on-surface-variant leading-relaxed">
                70% menos residuos en obra, 60% de ahorro en consumo de agua y 45% de menor huella de carbono respecto a métodos tradicionales. Programas de reciclaje de materiales sobrantes del proceso productivo.
              </p>
            </div>

            <!-- Calidad Certificada (Wide) -->
            <div class="md:col-span-2 bg-primary p-10 border border-primary-container shadow-ambient relative overflow-hidden group text-white">
              <div class="absolute -right-8 -bottom-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <mat-icon class="material-symbols-outlined text-[160px]">verified</mat-icon>
              </div>
              <h3 class="text-xl font-display font-bold mb-4 uppercase tracking-widest text-on-tertiary-container">Calidad Certificada en Cada Módulo</h3>
              <p class="text-sm text-slate-300 leading-relaxed max-w-2xl mb-8">
                Cada unidad pasa rigurosos controles técnicos en ambiente industrial: pruebas hidrostáticas de presión y estanqueidad, seguridad eléctrica certificada conforme al REBT, certificación estructural acero S275JR y cumplimiento normativo VPO. Control total del proceso productivo con trazabilidad completa.
              </p>
              <div class="flex flex-wrap gap-3">
                <span class="px-3 py-1 bg-white/10 text-[0.65rem] font-bold tracking-widest uppercase border border-white/10">Acero S275JR</span>
                <span class="px-3 py-1 bg-white/10 text-[0.65rem] font-bold tracking-widest uppercase border border-white/10">REBT</span>
                <span class="px-3 py-1 bg-white/10 text-[0.65rem] font-bold tracking-widest uppercase border border-white/10">VPO</span>
                <span class="px-3 py-1 bg-white/10 text-[0.65rem] font-bold tracking-widest uppercase border border-white/10">TABIHAUS®</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="py-24 bg-surface">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 class="text-3xl md:text-4xl font-display font-bold text-primary mb-10 uppercase tracking-wide">¿LISTO PARA INDUSTRIALIZAR SU PRÓXIMO PROYECTO?</h2>
          <div class="flex flex-wrap justify-center gap-6">
            <a routerLink="/como" class="px-10 py-4 bg-primary text-white font-bold text-sm uppercase tracking-widest hover:bg-primary-container transition-all flex items-center gap-2 group">
              Ver Cómo Trabajamos
              <mat-icon class="material-symbols-outlined text-on-tertiary-container group-hover:translate-x-1 transition-transform">settings_suggest</mat-icon>
            </a>
            <a routerLink="/contacto" class="px-10 py-4 bg-surface border border-outline-variant/30 text-primary font-bold text-sm uppercase tracking-widest hover:bg-surface-container-low transition-all flex items-center gap-2 group">
              Hablar con un Experto
              <mat-icon class="material-symbols-outlined text-on-tertiary-container group-hover:translate-x-1 transition-transform">support_agent</mat-icon>
            </a>
          </div>
        </div>
      </div>
    </div>
  `
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
