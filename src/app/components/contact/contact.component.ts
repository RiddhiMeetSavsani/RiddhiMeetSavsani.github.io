import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  standalone: true
})
export class ContactComponent {
  @ViewChild('contactForm') contactForm!: ElementRef<HTMLFormElement>;
  @ViewChild('formFeedback') formFeedback!: ElementRef<HTMLDivElement>;

  onSubmit(event: Event) {
    event.preventDefault(); // Prevent default form submission behavior

    const formData = new FormData(this.contactForm.nativeElement);

    fetch('https://formspree.io/f/mzzbqeve', {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          this.displayFeedback('Thank you! Your message has been sent successfully.', 'alert-success');
          this.contactForm.nativeElement.reset(); // Clear the form fields
        } else {
          throw new Error('Form submission failed.');
        }
      })
      .catch((error) => {
        this.displayFeedback('There was an error submitting the form. Please try again.', 'alert-danger');
        console.error('Error:', error);
      });
  }

  private displayFeedback(message: string, alertClass: string) {
    const feedbackElement = this.formFeedback.nativeElement;
    feedbackElement.className = `alert ${alertClass}`;
    feedbackElement.textContent = message;
    feedbackElement.style.display = 'block';

    setTimeout(() => {
      feedbackElement.style.display = 'none';
    }, 5000);
  }
}
