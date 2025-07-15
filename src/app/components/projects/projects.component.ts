import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  standalone: true
})
export class ProjectsComponent implements OnInit, OnDestroy {
  images: string[] = [
    'assets/images/missanPhoto1.png',
    'assets/images/missanPhoto2.png'
  ];

  currentImage: string = this.images[0];
  private currentIndex: number = 0;
  private intervalId: any;

  ngOnInit(): void {
    this.startImageRotation();
  }

  startImageRotation(): void {
    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
      this.currentImage = this.images[this.currentIndex];
    }, 3000); // change every 3 seconds
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
}
