import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatIconModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  isMenuOpen = false;
  
  navItems = [
    { path: '/home', label: 'Home', icon: 'home' },
    { path: '/quienes', label: 'Quiénes', icon: 'groups' },
    { path: '/que', label: 'Qué', icon: 'inventory_2' },
    { path: '/como', label: 'Cómo', icon: 'settings' },
    { path: '/donde', label: 'Dónde', icon: 'location_on' },
    { path: '/cuando', label: 'Cuándo', icon: 'schedule' }
  ];

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
