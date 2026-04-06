import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { CookieBannerComponent } from './components/cookie-banner/cookie-banner.component';
import { MatIcon } from "@angular/material/icon";
import { AiBotComponent } from './components/ai-bot.component/ai-bot.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, CookieBannerComponent, MatIcon, AiBotComponent],
  templateUrl: './app.html',
})
export class App {
  chatOpen = signal(false);

  toggleChat() {
    this.chatOpen.update(v => !v);
  }
}