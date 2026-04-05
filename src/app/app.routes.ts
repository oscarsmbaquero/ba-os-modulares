import {Routes} from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { 
    path: 'home', 
    loadComponent: () => import('./pages/home/home').then(m => m.HomeComponent) 
  },
  { 
    path: 'quienes', 
    loadComponent: () => import('./pages/quienes/quienes').then(m => m.QuienesComponent) 
  },
  { 
    path: 'que', 
    loadComponent: () => import('./pages/que/que').then(m => m.QueComponent) 
  },
  { 
    path: 'como', 
    loadComponent: () => import('./pages/como/como').then(m => m.ComoComponent) 
  },
  { 
    path: 'donde', 
    loadComponent: () => import('./pages/donde/donde').then(m => m.DondeComponent) 
  },
  { 
    path: 'cuando', 
    loadComponent: () => import('./pages/cuando/cuando').then(m => m.CuandoComponent) 
  },
  { 
    path: 'contacto', 
    loadComponent: () => import('./pages/contacto/contacto').then(m => m.ContactoComponent) 
  },
  { path: '**', redirectTo: '/home' }
];

