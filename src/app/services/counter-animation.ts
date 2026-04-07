import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, WritableSignal } from '@angular/core';

export interface CounterAnimationOptions {
  durationMs?: number;
}

@Injectable({
  providedIn: 'root'
})
export class CounterAnimationService {
  private platformId = inject(PLATFORM_ID);

  animateTo(target: number, counter: WritableSignal<number>, options?: CounterAnimationOptions) {
    if (!isPlatformBrowser(this.platformId)) {
      counter.set(target);
      return;
    }

    const durationMs = options?.durationMs ?? 1600;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      counter.set(Math.round(target * eased));

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  }
}