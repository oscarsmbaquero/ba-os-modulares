import { Directive, ElementRef, AfterViewInit, OnDestroy, inject, input, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { animate, inView } from 'motion';

export type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'fade';

const OFFSETS: Record<RevealDirection, { x?: number[]; y?: number[] }> = {
  up: { y: [32, 0] },
  down: { y: [-32, 0] },
  left: { x: [32, 0] },
  right: { x: [-32, 0] },
  fade: {},
};

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[reveal]',
  standalone: true,
})
export class RevealDirective implements AfterViewInit, OnDestroy {
  private elementRef = inject(ElementRef<HTMLElement>);
  private platformId = inject(PLATFORM_ID);
  private stopObserving?: () => void;

  revealDirection = input<RevealDirection>('up');
  revealDelay = input(0);

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const element = this.elementRef.nativeElement;
    const offset = OFFSETS[this.revealDirection()] ?? OFFSETS['up'];
    element.style.opacity = '0';

    this.stopObserving = inView(
      element,
      () => {
        animate(
          element,
          { opacity: [0, 1], ...offset },
          { duration: 0.7, delay: this.revealDelay(), ease: [0.22, 1, 0.36, 1] }
        );
        this.stopObserving?.();
      },
      { amount: 0.2, margin: '0px 0px -10% 0px' }
    );
  }

  ngOnDestroy() {
    this.stopObserving?.();
  }
}
