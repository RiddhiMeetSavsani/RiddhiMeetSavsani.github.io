import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {MainpageComponent} from '../mainpage/mainpage.component';
import {AboutMeComponent} from '../about-me/about-me.component';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink
  ],
  templateUrl: './header.component.html',
  standalone: true,
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private router: Router) {}

  navigateToSection(route: string, sectionId: string): void {
    this.router.navigate([route]).then(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }
}
