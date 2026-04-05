import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CookieService {
  private readonly STORAGE_KEY = '2ibm_cookie_consent';
  private platformId = inject(PLATFORM_ID);
  
  consentGiven = signal<boolean>(false);
  preferences = signal<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false
  });

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadPreferences();
    }
  }

  private loadPreferences() {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        this.preferences.set(parsed);
        this.consentGiven.set(true);
      } catch (e) {
        console.error('Error parsing cookie preferences', e);
      }
    }
  }

  savePreferences(prefs: CookiePreferences) {
    this.preferences.set(prefs);
    this.consentGiven.set(true);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(prefs));
    }
  }

  acceptAll() {
    this.savePreferences({
      necessary: true,
      analytics: true,
      marketing: true
    });
  }

  rejectAll() {
    this.savePreferences({
      necessary: true,
      analytics: false,
      marketing: false
    });
  }
}
