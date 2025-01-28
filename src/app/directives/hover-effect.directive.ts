import {Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appHoverEffect]'
})
export class HoverEffectDirective {
  @Input() underlineColor: string = 'white'; // Default color is white

  constructor(private el: ElementRef, private renderer: Renderer2) {
    // Ensure the parent element has relative positioning
    const parentPosition = getComputedStyle(this.el.nativeElement).position;
    if (parentPosition === 'static') {
      this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
    }
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.addUnderline();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.removeUnderline();
  }

  private addUnderline() {
    const underline = this.renderer.createElement('span');
    this.renderer.setStyle(underline, 'content', '""');
    this.renderer.setStyle(underline, 'position', 'absolute');
    this.renderer.setStyle(underline, 'left', '0');
    this.renderer.setStyle(underline, 'bottom', '0');
    this.renderer.setStyle(underline, 'width', '100%');
    this.renderer.setStyle(underline, 'height', '2px');
    this.renderer.setStyle(underline, 'backgroundColor', this.underlineColor); // Use the input color
    this.renderer.setStyle(underline, 'transition', 'width 0.3s ease');
    this.renderer.setStyle(underline, 'width', '0');
    underline.className = 'hover-underline'; // Add a custom class for cleanup

    this.el.nativeElement.appendChild(underline);

    setTimeout(() => {
      this.renderer.setStyle(underline, 'width', '100%');
    });
  }

  private removeUnderline() {
    const underline = this.el.nativeElement.querySelector('.hover-underline');
    if (underline) {
      this.renderer.setStyle(underline, 'width', '0');
      setTimeout(() => {
        if (underline && underline.parentElement) {
          this.renderer.removeChild(this.el.nativeElement, underline);
        }
      }, 300); // Match transition duration
    }
  }
}
