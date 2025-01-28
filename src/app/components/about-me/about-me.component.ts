import { Component } from '@angular/core';
import {SkillsComponent} from '../skills/skills.component';
import {EmploymentComponent} from '../employment/employment.component';
import {EducationComponent} from '../education/education.component';
import {HobbyComponent} from '../hobby/hobby.component';

@Component({
  selector: 'app-about-me',
  imports: [
    SkillsComponent,
    EmploymentComponent,
    EducationComponent,
    HobbyComponent
  ],
  templateUrl: './about-me.component.html',
  standalone: true,
  styleUrl: './about-me.component.css'
})
export class AboutMeComponent {

}
