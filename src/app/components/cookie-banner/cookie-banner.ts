import { Component, inject, signal, ElementRef, AfterViewInit, ViewChild, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CookieService, CookiePreferences } from '../../services/cookie';
import { animate } from 'motion';

@Component({
  selector: 'app-cookie-banner',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './cookie-banner.html',
  styleUrl: 'cookie-banner.css'
})
export class CookieBannerComponent implements AfterViewInit {
  cookieService = inject(CookieService);
  private platformId = inject(PLATFORM_ID);
  
  @ViewChild('bannerContainer') bannerContainer?: ElementRef;
  
  showSettings = signal(false);
  tempPrefs: CookiePreferences = {
    necessary: true,
    analytics: false,
    marketing: false
  };

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId) && this.bannerContainer) {
      animate(this.bannerContainer.nativeElement, 
        { y: [40, 0], opacity: [0, 1] }, 
        { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
      );
    }
  }

  saveSettings() {
    this.cookieService.savePreferences(this.tempPrefs);
  }
}
