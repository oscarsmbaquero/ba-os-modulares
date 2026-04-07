import {Routes} from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { 
    path: 'home', 
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) 
  },
  { 
    path: 'quienes', 
    loadComponent: () => import('./pages/quienes.component/quienes.component').then(m => m.QuienesComponent) 
  },
  { 
    path: 'que', 
    loadComponent: () => import('./pages/que/que.component').then(m => m.QueComponent) 
  },
  { 
    path: 'como', 
    loadComponent: () => import('./pages/como/como.component').then(m => m.ComoComponent) 
  },
  { 
    path: 'donde', 
    loadComponent: () => import('./pages/donde/donde.component').then(m => m.DondeComponent) 
  },
  { 
    path: 'cuando', 
    loadComponent: () => import('./pages/cuando/cuando.component').then(m => m.CuandoComponent) 
  },
  { 
    path: 'contacto', 
    loadComponent: () => import('./pages/contacto/contacto.component').then(m => m.ContactoComponent) 
  },
  {
    path: 'aviso-legal',
    loadComponent: () => import('./pages/aviso-legal/aviso-legal.component').then(m => m.AvisoLegalComponent)
  },
  {
    path: 'privacidad',
    loadComponent: () => import('./pages/privacidad/privacidad.component').then(m => m.PrivacidadComponent)
  },
  { path: '**', redirectTo: '/home' }
];

