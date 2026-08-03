import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CookieService } from '../../services/cookie';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatIconModule],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  private cookieService = inject(CookieService);

  manageCookies() {
    this.cookieService.openPreferencesPanel();
  }

  getYear(): number {
    return new Date().getFullYear();
  }
}
