import { Component } from '@angular/core';
import {SkillsComponent} from '../skills/skills.component';
import {EmploymentComponent} from '../employment/employment.component';
import {EducationComponent} from '../education/education.component';

@Component({
  selector: 'app-about-me',
  imports: [
    SkillsComponent,
    EmploymentComponent,
    EducationComponent
  ],
  templateUrl: './about-me.component.html',
  standalone: true,
  styleUrl: './about-me.component.css'
})
export class AboutMeComponent {

}
