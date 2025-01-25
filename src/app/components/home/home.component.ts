import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  typingSpeed = 100; // Speed in milliseconds
  index = 0;
  intervalId: any;

  ngOnInit(): void {
    this.typeWriter();
  }

  ngOnDestroy(): void {
    // Clear any existing intervals when the component is destroyed
    clearInterval(this.intervalId);
  }

  typeWriter() {
    const element = document.getElementById('typingEffect');

    if (element) {
      const text = element.textContent || element.innerText; // Fetch the text from the HTML element

      // Initially hide the text using visibility: hidden
      element.style.visibility = 'hidden';

      // Clear any existing interval before starting a new one
      clearInterval(this.intervalId);

      // Start typing the text from left to right
      this.intervalId = setInterval(() => {
        // Set only the character at the current index
        element.textContent = text.substring(0, this.index + 1); // Only show up to the current index
        element.style.visibility = 'visible'; // Make the text visible
        this.index++;

        // Stop when the text is fully typed
        if (this.index === text.length) {
          clearInterval(this.intervalId);

          // After typing is complete, restart the typing effect
          setTimeout(() => {
            this.index = 0; // Reset index
            element.style.visibility = 'hidden'; // Clear the text content
            this.typeWriter(); // Restart the typing effect
          }, 1000); // Delay before restarting
        }
      }, this.typingSpeed);
    }
  }
}
