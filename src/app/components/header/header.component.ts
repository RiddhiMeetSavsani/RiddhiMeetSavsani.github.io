

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [

  ],
  templateUrl: './header.component.html',
  standalone: true,
  styleUrl: './header.component.css' // Ensure 'styleUrls' if it's an array
})
export class HeaderComponent {
  constructor(private router: Router) {}



  navigateToSection(route: string, sectionId: string): void {
    this.router.navigate([route]).then(() => {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          // Calculate exact position to scroll to, avoiding inconsistencies
          const yOffset = -90; // Adjust for sticky headers or fixed elements
          const yPosition = element.getBoundingClientRect().top + window.scrollY + yOffset;

          // Smooth scrolling to the exact position
          window.scrollTo({
            top: yPosition,
            behavior: 'smooth',
          });
        }
      }, 0); // Minimal delay to allow DOM rendering


    });
  }



}
