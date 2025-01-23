import {Component, AfterViewInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  standalone: true,
  styleUrls: ['./skills.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SkillsComponent implements AfterViewInit {

  // After the view is initialized, enable tooltips
  ngAfterViewInit(): void {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]') as NodeListOf<HTMLElement>;
    [...tooltipTriggerList].forEach((tooltipTriggerEl) => {
      // @ts-ignore
      new tooltipTriggerEl.Tooltip(tooltipTriggerEl);
    });
  }
}
